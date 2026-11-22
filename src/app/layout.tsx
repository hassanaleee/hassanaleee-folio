import type { Metadata, Viewport } from 'next';
import './globals.css';
import { personalInfo } from '../data/portfolioData';

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.role}`,
  description: `${personalInfo.name} — ${personalInfo.headline} ${personalInfo.intro}`,
  keywords: [
    'Hassan Kazmi',
    'AI & Machine Learning Engineer',
    'Machine Learning',
    'Generative AI',
    'RAG',
    'Python',
    'FastAPI',
    'Next.js',
    'Intelligent Systems',
    'COMSATS University Islamabad',
    'MockAI',
    'Intelligence OS',
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.github }],
  openGraph: {
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.headline,
    url: 'https://hassankazmi.me',
    siteName: `${personalInfo.name} Portfolio`,
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#171716',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.dataset.theme = theme;
                } catch (e) {
                  document.documentElement.dataset.theme = 'dark';
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[var(--sc-ink)] selection:text-[var(--sc-canvas)]">
        {children}
      </body>
    </html>
  );
}
