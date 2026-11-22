'use client';

import React, { useEffect, useRef } from 'react';

interface GlyphBackgroundProps {
  code: string;
  fontSize?: number;
  interactive?: boolean;
  className?: string;
}

const vertexShaderSource = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
uniform sampler2D atlas;
uniform vec2 size;
uniform vec2 cell;
uniform float dpr;
uniform float time;
uniform float rest;
uniform float haze;
uniform float hoverInk;
uniform vec3 pointer;
uniform float activity;
uniform vec2 drift;
uniform vec3 color;
uniform vec3 accent;
uniform vec4 waves[12];
uniform vec4 trail[8];

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float smoothNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float outline(float kind, float angle, float phase) {
  if (kind < 0.5) return 1.0;
  if (kind < 1.5) {
    float s = sin(angle);
    float c = cos(angle);
    return (2.0 - 2.0 * s + s * sqrt(abs(c)) / (s + 1.4)) * 0.42;
  }
  return 1.0 + 0.14 * sin(3.0 * angle + phase) + 0.08 * sin(5.0 * angle - phase * 1.3);
}

void main() {
  vec2 pixel = vec2(gl_FragCoord.x, size.y - gl_FragCoord.y);
  vec2 index = floor(pixel / cell);
  vec2 point = (index + 0.5) * cell / dpr;

  float ring = 0.0;
  for (int i = 0; i < 6; i++) {
    vec4 a = waves[i * 2];
    vec4 b = waves[i * 2 + 1];
    if (a.w <= 0.0) continue;
    vec2 v = point - a.xy;
    float angle = atan(-v.y, v.x);
    float shape = mix(1.0, outline(b.x, angle, b.z), b.y);
    shape *= 1.0 + 0.07 * sin(3.0 * angle + b.z + b.w) + 0.05 * sin(5.0 * angle - b.z * 1.7 - b.w * 1.3) + 0.03 * sin(9.0 * angle + b.w * 2.1);
    float d = length(v) - a.z * shape;
    float k = d > 0.0 ? d / 14.0 : d / 42.0;
    ring = max(ring, exp(-k * k) * a.w);
  }

  float focus = length((point - pointer.xy) / vec2(86.0, 48.0));
  float hover = pointer.z * (1.0 - smoothstep(0.12, 1.0, focus));
  for (int i = 0; i < 8; i++) {
    vec4 t = trail[i];
    if (t.w <= 0.0) continue;
    vec2 v = point - t.xy;
    hover += t.w * exp(-dot(v, v) / (2.0 * t.z * t.z));
  }
  hover = min(hover, 1.0);

  mat2 turn = mat2(0.82, 0.57, -0.57, 0.82);
  vec2 q = turn * (point - drift);
  float blob = smoothNoise(vec2(q.x / 140.0, q.y / 80.0) + vec2(time * 0.04, 0.0)) * 0.62
    + smoothNoise(vec2(q.x / 62.0, q.y / 36.0) + vec2(3.7, time * 0.06)) * 0.38;
  float grain = smoothNoise(vec2(q.x / 30.0, q.y / 14.0) + vec2(time * 0.2, 7.3));
  float cloud = blob * (0.82 + 0.24 * grain);
  float mask = pow(smoothstep(0.47 - 0.2 * activity, 0.84, cloud), 2.6);

  float ink = texture2D(atlas, pixel / size).a;

  vec2 viewport = size / dpr;
  vec2 patchSize = vec2(min(110.0, viewport.x * 0.23), 38.0);
  vec2 a = (point - viewport * vec2(0.16, 0.22)) / patchSize;
  vec2 b = (point - viewport * vec2(0.83, 0.36)) / patchSize;
  vec2 c = (point - viewport * vec2(0.22, 0.77)) / patchSize;
  vec2 d = (point - viewport * vec2(0.84, 0.82)) / patchSize;
  float idle = max(
    max(exp(-dot(a, a)) * (0.8 + 0.15 * sin(time * 0.18)),
        exp(-dot(b, b)) * (0.8 + 0.15 * sin(time * 0.18 + 1.6))),
    max(exp(-dot(c, c)) * (0.8 + 0.15 * sin(time * 0.18 + 3.2)),
        exp(-dot(d, d)) * (0.8 + 0.15 * sin(time * 0.18 + 4.8)))
  );
  float grey = ink * clamp(rest + 0.075 * idle + haze * mask * (1.0 + 0.3 * activity) + hoverInk * hover * (0.9 + 0.1 * mask), 0.0, 1.0);
  float blue = ink * ring * 0.10;
  float alpha = grey + blue - grey * blue;
  vec3 tint = color * grey * (1.0 - blue) + accent * blue;
  gl_FragColor = vec4(tint, alpha);
}
`;

export const GlyphBackground: React.FC<GlyphBackgroundProps> = ({
  code,
  fontSize = 12,
  interactive = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!gl) return;

    const shadersToClean: WebGLShader[] = [];
    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shadersToClean.push(shader);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };

    const vert = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const frag = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();
    if (!vert || !frag || !program) {
      shadersToClean.forEach((s) => gl.deleteShader(s));
      if (program) gl.deleteProgram(program);
      return;
    }

    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      shadersToClean.forEach((s) => gl.deleteShader(s));
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    // Full screen triangle
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Texture for code atlas
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const uniformNames = [
      'atlas', 'size', 'cell', 'dpr', 'time', 'rest', 'haze',
      'hoverInk', 'pointer', 'activity', 'drift', 'color', 'accent',
      'waves[0]', 'trail[0]'
    ];
    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    for (const name of uniformNames) {
      uniforms[name] = gl.getUniformLocation(program, name);
    }

    gl.uniform1i(uniforms['atlas'], 0);
    gl.uniform1f(uniforms['rest'], 0.035);
    gl.uniform1f(uniforms['haze'], 0.12);
    gl.uniform1f(uniforms['hoverInk'], 0.45);

    const offscreenCanvas = document.createElement('canvas');
    const offscreenCtx = offscreenCanvas.getContext('2d');
    const colorProbeCanvas = document.createElement('canvas');
    const colorProbeCtx = colorProbeCanvas.getContext('2d');

    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;
    let isIntersecting = true;
    let pointerPos: { x: number; y: number } | null = null;
    let waves: Array<{ x: number; y: number; at: number }> = [];
    let trail: Array<{ x: number; y: number; at: number }> = [];
    const waveData = new Float32Array(48);
    const trailData = new Float32Array(32);

    const updateThemeColors = () => {
      if (!colorProbeCtx) return;
      // Probe current color from computed style of container
      const currentStyle = getComputedStyle(container);
      colorProbeCtx.fillStyle = currentStyle.color || '#f8f7f4';
      colorProbeCtx.fillRect(0, 0, 1, 1);
      const data = colorProbeCtx.getImageData(0, 0, 1, 1).data;
      const r = data[0] / 255;
      const g = data[1] / 255;
      const b = data[2] / 255;
      gl.uniform3f(uniforms['color'], r, g, b);
      gl.uniform3f(uniforms['accent'], r, g, b);
    };

    const buildAtlas = () => {
      if (!offscreenCtx) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(15e5 / Math.max(1, width * height)));

      canvas.width = offscreenCanvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = offscreenCanvas.height = Math.max(1, Math.round(height * dpr));

      offscreenCtx.scale(dpr, dpr);
      offscreenCtx.fillStyle = 'white';
      offscreenCtx.font = `400 ${fontSize}px ${getComputedStyle(container).fontFamily || 'monospace'}`;
      offscreenCtx.textBaseline = 'top';

      const lineHeight = fontSize * 1.7;
      const colWidth = Math.max(320, width / Math.max(1, Math.floor(width / 370)));
      const lines = code.split('\n');

      let currentX = 24;
      let currentY = 24;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        offscreenCtx.fillText(line, currentX, currentY);
        currentY += lineHeight;
        if (currentY > height - 40) {
          currentY = 24;
          currentX += colWidth;
        }
      }

      // Upload canvas to texture
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offscreenCanvas);
      updateThemeColors();
    };

    buildAtlas();

    let animationFrameId: number;
    let lastTime = performance.now();

    const render = () => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      time += delta;

      if (isIntersecting && width && height) {
        // Filter expired waves and trail
        waveData.fill(0);
        waves = waves.filter((w) => time - w.at < 3.5);
        waves.forEach((w, idx) => {
          if (idx >= 6) return;
          const r = time - w.at;
          const alpha = Math.min(1, r / 0.1) * Math.exp(-r / 1.2);
          waveData.set([w.x, w.y, (380 * r) / (1 + 0.3 * r), alpha, 0, 0, 0, 0], idx * 8);
        });

        trailData.fill(0);
        trail = trail.filter((t) => time - t.at < 0.45);
        trail.forEach((t, idx) => {
          if (idx >= 8) return;
          const r = (time - t.at) / 0.45;
          trailData.set([t.x, t.y, 28, 0.22 * Math.pow(1 - r, 2)], idx * 4);
        });

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uniforms['size'], canvas.width, canvas.height);
        gl.uniform2f(uniforms['cell'], 8 * dpr, 18 * dpr);
        gl.uniform1f(uniforms['dpr'], dpr);
        gl.uniform1f(uniforms['time'], time);
        gl.uniform3f(
          uniforms['pointer'],
          pointerPos?.x ?? -1000,
          pointerPos?.y ?? -1000,
          pointerPos ? 1.0 : 0.0
        );
        gl.uniform1f(uniforms['activity'], trail.length / 8);
        gl.uniform2f(uniforms['drift'], -8 * time, 4 * time);
        gl.uniform4fv(uniforms['waves[0]'], waveData);
        gl.uniform4fv(uniforms['trail[0]'], trailData);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse pointer interaction
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointerPos = { x, y };
      trail.push({ x, y, at: time });
    };

    const handlePointerLeave = () => {
      pointerPos = null;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      waves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        at: time,
      });
    };

    if (interactive) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      container.addEventListener('pointerleave', handlePointerLeave);
      window.addEventListener('click', handleClick);
    }

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      buildAtlas();
    });
    resizeObserver.observe(container);

    // Theme mutation observer
    const themeObserver = new MutationObserver(() => {
      updateThemeColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      if (interactive) {
        window.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerleave', handlePointerLeave);
        window.removeEventListener('click', handleClick);
      }
      shadersToClean.forEach((s) => gl.deleteShader(s));
      gl.deleteProgram(program);
    };
  }, [code, fontSize, interactive]);

  return (
    <div
      ref={containerRef}
      className={`glyph-background ${className}`}
      data-slot="glyph-background"
      aria-hidden="true"
    >
      <pre className="glyph-code-fallback sr-only">{code}</pre>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};
