import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "Japan Life Toolsへのお問い合わせ方法です。"
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold text-blue-600">CONTACT</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">お問い合わせ</h1>
      </div>
      <div className="space-y-8 leading-8 text-slate-700">
        <section><h2 className="text-xl font-bold text-slate-950">不具合・改善提案</h2><p className="mt-3">計算結果の不具合、表示上の問題、追加してほしいツールなどがありましたら、GitHubのIssuesからお知らせください。</p><a className="mt-4 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-blue-600" href="https://github.com/RyuSeiri/japan-life-tools/issues" target="_blank" rel="noreferrer">GitHub Issuesを開く →</a></section>
        <section><h2 className="text-xl font-bold text-slate-950">お問い合わせ時のお願い</h2><p className="mt-3">給与明細、住所、電話番号、マイナンバーなど、個人を特定できる情報や機密情報は投稿しないでください。</p></section>
      </div>
    </main>
  );
}
