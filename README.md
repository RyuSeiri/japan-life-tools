# Japan Life Tools

日本での生活・仕事・お金・日付計算などをまとめる無料オンラインツールサイトです。

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000

## Build

```bash
npm run build
```

静的サイトは `out/` に生成されます。

## GitHub Pages

https://japan-tools.github.io/

GitHub Pages の公開設定は **Settings → Pages → Source: GitHub Actions** にしてください。

## 方針

- UIと計算ロジックを分離
- 制度・税率など年度で変わるデータは年度別に管理
- 制度系ツールは公式情報を確認して実装
- 個別ツールページを増やしてSEO流入を狙う
