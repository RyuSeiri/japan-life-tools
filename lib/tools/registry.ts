export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryName: string;
  keywords: string[];
};

export const tools: Tool[] = [
  { slug: "age-calculator", name: "年齢計算", description: "生年月日から現在または指定日の年齢を計算します。", category: "date", categoryName: "日付・時間", keywords: ["年齢計算", "年齢", "誕生日"] },
  { slug: "date-difference", name: "日付差計算", description: "2つの日付の経過日数をすばやく計算します。", category: "date", categoryName: "日付・時間", keywords: ["日付差", "日数計算"] },
  { slug: "date-add-subtract", name: "日付計算", description: "指定した日数を日付に加算・減算します。", category: "date", categoryName: "日付・時間", keywords: ["何日後", "何日前", "日付計算"] },
  { slug: "business-days", name: "営業日計算", description: "土日を除いた平日の営業日数を計算します。", category: "date", categoryName: "日付・時間", keywords: ["営業日", "平日", "日数"] },
  { slug: "tax-calculator", name: "税込・税抜計算", description: "10%・8%の消費税を含む金額と税抜金額を計算します。", category: "money", categoryName: "お金・節約", keywords: ["税込", "税抜", "消費税"] },
  { slug: "discount-calculator", name: "割引計算", description: "割引率から割引額と割引後価格を計算します。", category: "money", categoryName: "お金・節約", keywords: ["割引", "値引き"] },
  { slug: "split-bill", name: "割り勘計算", description: "合計金額を人数で割り、1人あたりの支払額を計算します。", category: "money", categoryName: "お金・節約", keywords: ["割り勘", "飲み会", "支払い"] },
  { slug: "gas-cost", name: "ガソリン代計算", description: "走行距離・燃費・ガソリン価格から交通費を計算します。", category: "life", categoryName: "生活・交通", keywords: ["ガソリン代", "燃費", "交通費"] },
  { slug: "electricity-cost", name: "電気代計算", description: "消費電力と使用時間から電気料金の目安を計算します。", category: "life", categoryName: "生活・交通", keywords: ["電気代", "電気料金", "消費電力"] },
  { slug: "json-formatter", name: "JSON Formatter", description: "JSONを整形・圧縮して読みやすく表示します。", category: "developer", categoryName: "IT・開発者", keywords: ["JSON", "Formatter", "JSON整形"] }
];

export const categories = [
  { slug: "date", name: "日付・時間" },
  { slug: "money", name: "お金・節約" },
  { slug: "life", name: "生活・交通" },
  { slug: "developer", name: "IT・開発者" }
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
