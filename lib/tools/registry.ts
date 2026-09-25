export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryName: string;
  keywords: string[];
  popular?: boolean;
};

export const tools: Tool[] = [
  {
    slug: "take-home-pay",
    name: "手取り計算",
    description:
      "年収・月収から所得税、住民税、社会保険料などを考慮した手取り額の目安を計算します。",
    category: "work",
    categoryName: "給与・税金",
    keywords: ["手取り計算", "給料 手取り", "年収 手取り", "給与計算"],
    popular: true,
  },
  {
    slug: "income-tax",
    name: "所得税計算",
    description:
      "給与収入から所得税の目安を計算します。給与所得控除・基礎控除を考慮した簡易計算です。",
    category: "work",
    categoryName: "給与・税金",
    keywords: ["所得税", "所得税計算", "給与所得", "税金"],
    popular: true,
  },
  {
    slug: "resident-tax",
    name: "住民税計算",
    description: "前年の所得をもとに住民税の目安を確認できます。",
    category: "work",
    categoryName: "給与・税金",
    keywords: ["住民税", "住民税計算", "市民税", "県民税"],
    popular: true,
  },
  {
    slug: "social-insurance",
    name: "社会保険料計算",
    description:
      "標準報酬月額をもとに健康保険・厚生年金などの負担額の目安を計算します。",
    category: "work",
    categoryName: "給与・税金",
    keywords: ["社会保険", "社会保険料", "健康保険", "厚生年金"],
    popular: true,
  },
  {
    slug: "overtime-pay",
    name: "残業代計算",
    description:
      "時給と残業時間から残業代の目安を計算します。割増率を指定できます。",
    category: "work",
    categoryName: "給与・税金",
    keywords: ["残業代", "残業代計算", "割増賃金", "時間外労働"],
    popular: true,
  },
  {
    slug: "hourly-wage",
    name: "時給計算",
    description:
      "月給と勤務時間から実質時給を計算します。月収から時給を知りたいときに便利です。",
    category: "work",
    categoryName: "給与・税金",
    keywords: ["時給計算", "時給", "月給 時給", "給与"],
    popular: true,
  },
  {
    slug: "age-calculator",
    name: "年齢計算",
    description: "生年月日から現在または指定日の年齢を計算します。",
    category: "date",
    categoryName: "日付・時間",
    keywords: ["年齢計算", "年齢", "誕生日"],
  },
  {
    slug: "date-difference",
    name: "日付差計算",
    description: "2つの日付の経過日数をすばやく計算します。",
    category: "date",
    categoryName: "日付・時間",
    keywords: ["日付差", "日数計算"],
  },
  {
    slug: "date-add-subtract",
    name: "日付計算",
    description: "指定した日数を日付に加算・減算します。",
    category: "date",
    categoryName: "日付・時間",
    keywords: ["何日後", "何日前", "日付計算"],
  },
  {
    slug: "business-days",
    name: "営業日計算",
    description: "土日を除いた平日の営業日数を計算します。",
    category: "date",
    categoryName: "日付・時間",
    keywords: ["営業日", "平日", "日数"],
  },
  {
    slug: "tax-calculator",
    name: "税込・税抜計算",
    description: "10%・8%の消費税を含む金額と税抜金額を計算します。",
    category: "money",
    categoryName: "お金・節約",
    keywords: ["税込", "税抜", "消費税"],
  },
  {
    slug: "discount-calculator",
    name: "割引計算",
    description: "割引率から割引額と割引後価格を計算します。",
    category: "money",
    categoryName: "お金・節約",
    keywords: ["割引", "値引き"],
  },
  {
    slug: "split-bill",
    name: "割り勘計算",
    description: "合計金額を人数で割り、1人あたりの支払額を計算します。",
    category: "money",
    categoryName: "お金・節約",
    keywords: ["割り勘", "飲み会", "支払い"],
  },
  {
    slug: "gas-cost",
    name: "ガソリン代計算",
    description: "走行距離・燃費・ガソリン価格から交通費を計算します。",
    category: "life",
    categoryName: "生活・交通",
    keywords: ["ガソリン代", "燃費", "交通費"],
  },
  {
    slug: "electricity-cost",
    name: "電気代計算",
    description: "消費電力と使用時間から電気料金の目安を計算します。",
    category: "life",
    categoryName: "生活・交通",
    keywords: ["電気代", "電気料金", "消費電力"],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "JSONを整形・圧縮して読みやすく表示します。",
    category: "developer",
    categoryName: "IT・開発者",
    keywords: ["JSON", "Formatter", "JSON整形"],
  },
];

export const categories = [
  {
    slug: "work",
    name: "給与・税金",
    description: "給与、税金、社会保険、残業など仕事とお金に関する計算ツール。",
  },
  {
    slug: "date",
    name: "日付・時間",
    description: "年齢、日付差、営業日など日付に関する便利なツール。",
  },
  {
    slug: "money",
    name: "お金・節約",
    description: "消費税、割引、割り勘など日常のお金を計算するツール。",
  },
  {
    slug: "life",
    name: "生活・交通",
    description: "ガソリン代や電気代など生活にかかる費用を計算するツール。",
  },
  {
    slug: "developer",
    name: "IT・開発者",
    description: "開発作業で使えるオンラインユーティリティ。",
  },
];

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}
