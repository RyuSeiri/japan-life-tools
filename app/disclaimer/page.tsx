import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免責事項",
  description: "Japan Life Toolsの免責事項です。"
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold text-blue-600">LEGAL</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">免責事項</h1>
        <p className="mt-3 text-sm text-slate-500">最終更新日：2026年9月25日</p>
      </div>
      <div className="space-y-8 leading-8 text-slate-700">
        <section><h2 className="text-xl font-bold text-slate-950">計算結果について</h2><p className="mt-3">当サイトの計算結果は、利用者が目安を確認するための参考情報です。税金、社会保険料、給与、各種制度の実際の金額は、勤務先、居住地、年齢、扶養状況、加入制度、年度などによって異なる場合があります。</p></section>
        <section><h2 className="text-xl font-bold text-slate-950">制度・法令について</h2><p className="mt-3">税制、社会保険、労働関係制度等は改正されることがあります。当サイトの情報だけを根拠として申告、契約、投資、労務上の判断その他の重要な意思決定を行わないでください。</p></section>
        <section><h2 className="text-xl font-bold text-slate-950">公式情報の確認</h2><p className="mt-3">重要な手続きや金額を確認する場合は、国税庁、日本年金機構、厚生労働省、自治体等の最新の公式情報をご確認ください。</p></section>
        <section><h2 className="text-xl font-bold text-slate-950">外部サイト</h2><p className="mt-3">当サイトから外部サイトへ移動できる場合があります。外部サイトの内容、サービス、プライバシー方針等について当サイトは責任を負いません。</p></section>
      </div>
    </main>
  );
}
