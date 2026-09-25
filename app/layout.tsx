import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: { default: "Japan Life Tools｜日本生活に役立つ無料計算ツール", template: "%s｜Japan Life Tools" },
  description: "日本での生活・仕事・お金・日付計算を無料で使える便利なオンラインツール集。",
  metadataBase: new URL("https://ryuseiri.github.io/japan-life-tools/")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body><Header />{children}<footer className="mt-16 border-t bg-white">
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-black text-slate-950">Japan Life <span className="text-blue-600">Tools</span></p>
          <p className="mt-2 text-sm text-slate-500">日本の生活に役立つ無料計算ツール</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
          <a href="/japan-life-tools/about/" className="hover:text-blue-600">サイトについて</a>
          <a href="/japan-life-tools/contact/" className="hover:text-blue-600">お問い合わせ</a>
          <a href="/japan-life-tools/privacy-policy/" className="hover:text-blue-600">プライバシーポリシー</a>
          <a href="/japan-life-tools/terms/" className="hover:text-blue-600">利用規約</a>
          <a href="/japan-life-tools/disclaimer/" className="hover:text-blue-600">免責事項</a>
        </nav>
      </div>
      <p className="mt-8 text-xs text-slate-400">© {new Date().getFullYear()} Japan Life Tools</p>
    </div>
  </footer></body></html>;
}
