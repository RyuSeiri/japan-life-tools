import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description: "Japan Life Toolsの利用規約です。",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold text-blue-600">LEGAL</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          利用規約
        </h1>
        <p className="mt-3 text-sm text-slate-500">最終更新日：2026年9月25日</p>
      </div>
      <div className="space-y-8 leading-8 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-950">
            1. サービスについて
          </h2>
          <p className="mt-3">
            当サイトは、日本での生活、仕事、お金、日付等に関する計算・情報ツールを提供します。各ツールは情報提供を目的としたもので、個別の税務、法律、労務、金融等の専門的助言ではありません。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">2. 利用について</h2>
          <p className="mt-3">
            利用者は、法令および公序良俗に反しない範囲で当サイトを利用するものとします。当サイトの内容を利用したことによって生じた損害について、当サイト運営者は法令上許される範囲で責任を負いません。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">3. 情報の正確性</h2>
          <p className="mt-3">
            制度や料金、税率等は変更されることがあります。当サイトでは情報の正確性に努めますが、利用時点での最新情報や個別事情を保証するものではありません。重要な判断を行う場合は、各制度の公式情報をご確認ください。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">
            4. サービスの変更・停止
          </h2>
          <p className="mt-3">
            当サイトは、予告なく内容の変更、追加、削除、メンテナンスまたは提供停止を行う場合があります。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">5. 規約の変更</h2>
          <p className="mt-3">
            必要に応じて本規約を変更することがあります。変更後の規約は当サイトに掲載した時点から適用します。
          </p>
        </section>
      </div>
    </main>
  );
}
