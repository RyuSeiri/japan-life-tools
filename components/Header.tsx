import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-ink">
          Japan Life Tools
        </Link>
        <nav className="flex gap-5 text-sm text-muted">
          <Link href="/tools/" className="hover:text-brand">すべてのツール</Link>
          <Link href="/categories/date/" className="hover:text-brand">日付・時間</Link>
          <Link href="/categories/money/" className="hover:text-brand">お金・節約</Link>
        </nav>
      </div>
    </header>
  );
}
