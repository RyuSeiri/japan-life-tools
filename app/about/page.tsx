import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて",
  description: "Japan Life Toolsについて。日本の生活に役立つ無料計算ツールを提供しています。"
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold text-blue-600">ABOUT</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Japan Life Toolsについて</h1>
      </div>
      <div className="space-y-8 leading-8 text-slate-700">
        <section><h2 className="text-xl font-bold text-slate-950">日本の生活を、もっと簡単に</h2><p className="mt-3">Japan Life Toolsは、給与、税金、社会保険、仕事、日付、生活費など、日本で暮らす中で「これっていくら？」「何日？」「どう計算する？」と思ったときに使える無料ツールをまとめたサイトです。</p></section>
        <section><h2 className="text-xl font-bold text-slate-950">分かりやすさを重視</h2><p className="mt-3">入力項目をできるだけシンプルにし、計算結果だけでなく、計算の内訳や注意点も確認できるサイトを目指しています。</p></section>
        <section><h2 className="text-xl font-bold text-slate-950">制度情報について</h2><p className="mt-3">税金や社会保険など年度によって変わる情報は、今後、年度別データと公式情報へのリンクを整備し、更新履歴を分かりやすくする予定です。</p></section>
      </div>
    </main>
  );
}
