import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Japan Life Toolsのプライバシーポリシーです。",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold text-blue-600">LEGAL</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
          プライバシーポリシー
        </h1>
        <p className="mt-3 text-sm text-slate-500">最終更新日：2026年9月25日</p>
      </div>
      <div className="space-y-8 leading-8 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-950">1. 基本方針</h2>
          <p className="mt-3">
            Japan Life
            Tools（以下「当サイト」）は、利用者のプライバシーを尊重し、利用者の個人情報を取得しません。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">2. 取得する情報</h2>
          <p className="mt-3">
            当サイトでは、氏名、住所、メールアドレスなどの個人情報を取得・保存しません。計算ツールに入力した数値は利用者のブラウザ内で処理され、当サイトのサーバーへ送信されません。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">
            3. Cookie・アクセス解析
          </h2>
          <p className="mt-3">
            現在、当サイトではCookie、アクセス解析、広告配信のための第三者サービスを利用していません。将来これらを導入する場合は、本ポリシーを更新してお知らせします。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">4. 広告について</h2>
          <p className="mt-3">
            当サイトでは、将来的に第三者配信の広告サービスを利用する場合があります。広告配信事業者は、利用者の興味に応じた広告を表示するためCookie等を使用することがあります。実際に導入しているサービスについては、導入時点の情報に更新します。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">
            5. 個人情報の第三者提供
          </h2>
          <p className="mt-3">
            法令に基づく場合を除き、本人の同意なく個人情報を第三者へ提供することはありません。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">6. 安全管理</h2>
          <p className="mt-3">
            取得した情報について、漏えい、紛失、改ざん等を防止するため、合理的な範囲で安全管理に努めます。
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">
            7. ポリシーの変更
          </h2>
          <p className="mt-3">
            法令やサービス内容の変更等に応じて、本ポリシーを改定することがあります。重要な変更がある場合は当サイト上でお知らせします。
          </p>
        </section>
      </div>
    </main>
  );
}
