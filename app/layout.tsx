import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: { default: "Japan Life Tools｜日本生活に役立つ無料計算ツール", template: "%s｜Japan Life Tools" },
  description: "日本での生活・仕事・お金・日付計算を無料で使える便利なオンラインツール集。",
  metadataBase: new URL("https://ryuseiri.github.io/japan-life-tools/")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body><Header />{children}<footer className="mt-16 border-t bg-white"><div className="mx-auto max-w-6xl px-5 py-8 text-sm text-muted">© {new Date().getFullYear()} Japan Life Tools</div></footer></body></html>;
}
