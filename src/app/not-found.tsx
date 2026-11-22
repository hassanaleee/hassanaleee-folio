import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-[var(--sc-ink-soft)] mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] text-[var(--sc-ink)] text-sm font-semibold hover:border-[var(--line-strong)]"
      >
        Return Home
      </Link>
    </div>
  );
}
