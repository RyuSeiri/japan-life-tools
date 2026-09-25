import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-black tracking-tight text-slate-950">Japan Life <span className="text-blue-600">Tools</span></Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <Link href="/tools/" className="hover:text-blue-600">すべてのツール</Link>
          <Link href="/categories/work/" className="hover:text-blue-600">給与・税金</Link>
          <Link href="/categories/date/" className="hover:text-blue-600">日付・時間</Link>
          <Link href="/categories/money/" className="hover:text-blue-600">お金・節約</Link>
        </nav>
        <Link href="/tools/" className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600">ツールを探す</Link>
      </div>
    </header>
  );
}
