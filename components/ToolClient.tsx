"use client";

import { useMemo, useState } from "react";

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border bg-white p-5 shadow-sm">{children}</div>;
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block">{<span className={labelClass}>{label}</span>}{children}</label>;
}
function Result({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 rounded-xl bg-slate-50 p-4 text-center text-lg font-bold">{children}</div>;
}

function AgeCalculator() {
  const [birth, setBirth] = useState("1990-01-01");
  const [base, setBase] = useState(new Date().toISOString().slice(0,10));
  const result = useMemo(() => {
    const b = new Date(birth + "T00:00:00"), d = new Date(base + "T00:00:00");
    if (Number.isNaN(b.getTime()) || Number.isNaN(d.getTime()) || d < b) return null;
    let years = d.getFullYear() - b.getFullYear();
    let months = d.getMonth() - b.getMonth();
    let days = d.getDate() - b.getDate();
    if (days < 0) { months--; const last = new Date(d.getFullYear(), d.getMonth(), 0).getDate(); days += last; }
    if (months < 0) { years--; months += 12; }
    return { years, months, days };
  }, [birth, base]);
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="生年月日"><input className={inputClass} type="date" value={birth} onChange={e=>setBirth(e.target.value)} /></Field><Field label="基準日"><input className={inputClass} type="date" value={base} onChange={e=>setBase(e.target.value)} /></Field></div><Result>{result ? `${result.years}歳 ${result.months}か月 ${result.days}日` : "日付を確認してください"}</Result></Card>;
}

function DateDifference() {
  const [start, setStart] = useState(new Date().toISOString().slice(0,10));
  const [end, setEnd] = useState(new Date().toISOString().slice(0,10));
  const days = useMemo(() => Math.round((new Date(end+"T00:00:00").getTime()-new Date(start+"T00:00:00").getTime())/86400000), [start,end]);
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="開始日"><input className={inputClass} type="date" value={start} onChange={e=>setStart(e.target.value)} /></Field><Field label="終了日"><input className={inputClass} type="date" value={end} onChange={e=>setEnd(e.target.value)} /></Field></div><Result>{days >= 0 ? `${days}日` : `-${Math.abs(days)}日`}</Result><p className="mt-3 text-xs text-muted">開始日を0日目として経過日数を計算します。</p></Card>;
}

function DateAddSubtract() {
  const [date,setDate]=useState(new Date().toISOString().slice(0,10)); const [days,setDays]=useState("30"); const [mode,setMode]=useState("add");
  const result=useMemo(()=>{const d=new Date(date+"T00:00:00"); d.setDate(d.getDate()+(mode==="add"?Number(days):-Number(days))); return Number.isNaN(d.getTime())?"":d.toISOString().slice(0,10)},[date,days,mode]);
  return <Card><div className="grid gap-4 md:grid-cols-3"><Field label="基準日"><input className={inputClass} type="date" value={date} onChange={e=>setDate(e.target.value)} /></Field><Field label="日数"><input className={inputClass} type="number" min="0" value={days} onChange={e=>setDays(e.target.value)} /></Field><Field label="計算"><select className={inputClass} value={mode} onChange={e=>setMode(e.target.value)}><option value="add">○日後</option><option value="sub">○日前</option></select></Field></div><Result>{result}</Result></Card>;
}

function BusinessDays() {
  const [start,setStart]=useState(new Date().toISOString().slice(0,10)); const [end,setEnd]=useState(new Date().toISOString().slice(0,10));
  const count=useMemo(()=>{let a=new Date(start+"T00:00:00"),b=new Date(end+"T00:00:00"); if(a>b)[a,b]=[b,a]; let n=0; for(let d=new Date(a);d<=b;d.setDate(d.getDate()+1)){const w=d.getDay();if(w!==0&&w!==6)n++;} return n;},[start,end]);
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="開始日"><input className={inputClass} type="date" value={start} onChange={e=>setStart(e.target.value)} /></Field><Field label="終了日"><input className={inputClass} type="date" value={end} onChange={e=>setEnd(e.target.value)} /></Field></div><Result>{count}営業日</Result><p className="mt-3 text-xs text-muted">現在は土日を除外します。日本の祝日データは次の更新で追加予定です。</p></Card>;
}

function TaxCalculator() {
  const [amount,setAmount]=useState("10000"); const [rate,setRate]=useState("10");
  const taxIncluded=Number(amount)*(1+Number(rate)/100); const tax=taxIncluded-Number(amount);
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="税抜金額"><input className={inputClass} type="number" min="0" value={amount} onChange={e=>setAmount(e.target.value)} /></Field><Field label="税率"><select className={inputClass} value={rate} onChange={e=>setRate(e.target.value)}><option value="10">10%</option><option value="8">8%</option></select></Field></div><Result>税込 {Math.round(taxIncluded).toLocaleString()} 円</Result><p className="mt-3 text-center text-sm text-muted">消費税額：{Math.round(tax).toLocaleString()} 円</p></Card>;
}

function DiscountCalculator() {
  const [price,setPrice]=useState("10000"); const [rate,setRate]=useState("20"); const discount=Number(price)*Number(rate)/100; return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="元の価格"><input className={inputClass} type="number" min="0" value={price} onChange={e=>setPrice(e.target.value)} /></Field><Field label="割引率（%）"><input className={inputClass} type="number" min="0" max="100" value={rate} onChange={e=>setRate(e.target.value)} /></Field></div><Result>割引後 {Math.round(Number(price)-discount).toLocaleString()} 円</Result><p className="mt-3 text-center text-sm text-muted">割引額：{Math.round(discount).toLocaleString()} 円</p></Card>;
}

function SplitBill() {
  const [total,setTotal]=useState("30000"); const [people,setPeople]=useState("4"); const n=Math.max(1,Number(people)); return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="合計金額"><input className={inputClass} type="number" min="0" value={total} onChange={e=>setTotal(e.target.value)} /></Field><Field label="人数"><input className={inputClass} type="number" min="1" value={people} onChange={e=>setPeople(e.target.value)} /></Field></div><Result>1人あたり {Math.ceil(Number(total)/n).toLocaleString()} 円</Result><p className="mt-3 text-center text-sm text-muted">端数は切り上げています。</p></Card>;
}

function GasCost() {
  const [distance,setDistance]=useState("300"); const [eff,setEff]=useState("15"); const [price,setPrice]=useState("175"); const liters=Number(distance)/Number(eff); return <Card><div className="grid gap-4 md:grid-cols-3"><Field label="走行距離（km）"><input className={inputClass} type="number" min="0" value={distance} onChange={e=>setDistance(e.target.value)} /></Field><Field label="燃費（km/L）"><input className={inputClass} type="number" min="0.1" value={eff} onChange={e=>setEff(e.target.value)} /></Field><Field label="ガソリン単価（円/L）"><input className={inputClass} type="number" min="0" value={price} onChange={e=>setPrice(e.target.value)} /></Field></div><Result>ガソリン代 約 {Math.round(liters*Number(price)).toLocaleString()} 円</Result><p className="mt-3 text-center text-sm text-muted">使用量：約 {liters.toFixed(1)} L</p></Card>;
}

function ElectricityCost() {
  const [watts,setWatts]=useState("100"); const [hours,setHours]=useState("8"); const [days,setDays]=useState("30"); const [rate,setRate]=useState("31");
  const kwh=Number(watts)*Number(hours)*Number(days)/1000; return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="消費電力（W）"><input className={inputClass} type="number" min="0" value={watts} onChange={e=>setWatts(e.target.value)} /></Field><Field label="1日の使用時間"><input className={inputClass} type="number" min="0" value={hours} onChange={e=>setHours(e.target.value)} /></Field><Field label="使用日数 / 月"><input className={inputClass} type="number" min="0" value={days} onChange={e=>setDays(e.target.value)} /></Field><Field label="電気単価（円/kWh）"><input className={inputClass} type="number" min="0" value={rate} onChange={e=>setRate(e.target.value)} /></Field></div><Result>月額 約 {Math.round(kwh*Number(rate)).toLocaleString()} 円</Result><p className="mt-3 text-center text-sm text-muted">月間使用量：約 {kwh.toFixed(1)} kWh</p></Card>;
}


function Money({ value }: { value: number }) {
  return <span>¥{Math.round(value).toLocaleString()}</span>;
}

function TakeHomePay() {
  const [annual, setAnnual] = useState("5000000");
  const [bonus, setBonus] = useState("0");
  const gross = Math.max(0, Number(annual) || 0);
  const bonusAmount = Math.max(0, Number(bonus) || 0);
  const monthly = Math.max(0, (gross - bonusAmount) / 12);
  // Simplified employee-side estimate. Actual premiums use standard monthly remuneration,
  // prefecture/insurer rates, age, and bonus treatment.
  const healthInsurance = gross * 0.050;
  const pension = gross * 0.0915;
  const employmentInsurance = gross * 0.0055;
  const social = healthInsurance + pension + employmentInsurance;
  const taxable = Math.max(0, gross - salaryDeduction(gross) - 480000 - social);
  const incomeTax = simpleIncomeTax(taxable);
  const residentTaxable = Math.max(0, gross - salaryDeduction(gross) - 430000);
  const residentTax = residentTaxable > 0 ? residentTaxable * 0.10 + 5000 : 0;
  const takeHome = Math.max(0, gross - social - incomeTax - residentTax);
  return <Card>
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="年収（総支給）"><input className={inputClass} type="number" min="0" value={annual} onChange={e=>setAnnual(e.target.value)} /></Field>
      <Field label="年間ボーナス"><input className={inputClass} type="number" min="0" value={bonus} onChange={e=>setBonus(e.target.value)} /></Field>
    </div>
    <Result><div className="text-sm font-semibold text-slate-500">年間手取り目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={takeHome} /></div><div className="mt-2 text-sm font-normal text-slate-500">月平均 約 <Money value={takeHome/12} /></div></Result>
    <Breakdown items={[
      ["総支給",gross],
      ["健康保険料の目安",healthInsurance],
      ["厚生年金保険料の目安",pension],
      ["雇用保険料の目安",employmentInsurance],
      ["社会保険料合計",social],
      ["所得税の目安",incomeTax],
      ["住民税の目安",residentTax],
      ["手取り",takeHome]
    ]} />
    <p className="mt-4 text-xs leading-5 text-slate-500">概算モデルです。厚生年金は本人負担分を9.15%として計算しています。健康保険は5.0%、雇用保険は0.55%の仮置きで、実際は標準報酬月額・賞与、都道府県、加入先、年齢、扶養、各種控除などで変わります。住民税は前年所得を基準に計算されるため、入力年収と同額がそのまま翌年の税額になるとは限りません。</p>
  </Card>;
}

function IncomeTax() {
  const [annual,setAnnual]=useState("5000000");
  const income=Math.max(0,Number(annual)||0);
  const salaryIncome=Math.max(0,income-salaryDeduction(income));
  const taxable=Math.max(0,salaryIncome-480000);
  const tax=simpleIncomeTax(taxable);
  return <Card><Field label="給与収入（年収）"><input className={inputClass} type="number" min="0" value={annual} onChange={e=>setAnnual(e.target.value)} /></Field><Result><div className="text-sm text-slate-500">所得税の目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={tax} /></div></Result><div className="mt-5 space-y-2 text-sm"><Row label="給与所得控除後の所得" value={salaryIncome}/><Row label="基礎控除後の課税所得（簡易）" value={taxable}/></div><p className="mt-4 text-xs leading-5 text-slate-500">扶養控除、配偶者控除、医療費控除などは含まない簡易計算です。実際の税額とは異なる場合があります。</p></Card>;
}

function ResidentTax() {
  const [annual,setAnnual]=useState("5000000");
  const income=Math.max(0,Number(annual)||0);
  const salaryIncome=Math.max(0,income-salaryDeduction(income));
  const taxable=Math.max(0,salaryIncome-430000);
  const tax=taxable*0.10+5000;
  return <Card><Field label="前年の給与収入（年収）"><input className={inputClass} type="number" min="0" value={annual} onChange={e=>setAnnual(e.target.value)} /></Field><Result><div className="text-sm text-slate-500">住民税の年額目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={tax} /></div><div className="mt-2 text-sm font-normal text-slate-500">月平均 約 <Money value={tax/12} /></div></Result><p className="mt-4 text-xs leading-5 text-slate-500">均等割・所得割を単純化した概算です。自治体、扶養、控除などによって実際の住民税は変わります。</p></Card>;
}

function SocialInsurance() {
  const [monthly,setMonthly]=useState("350000");
  const [rate,setRate]=useState("15");
  const amount=Math.max(0,Number(monthly)||0);
  const contribution=amount*(Number(rate)||0)/100;
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="標準報酬月額の目安"><input className={inputClass} type="number" min="0" value={monthly} onChange={e=>setMonthly(e.target.value)} /></Field><Field label="本人負担率（概算）"><input className={inputClass} type="number" min="0" max="30" step="0.1" value={rate} onChange={e=>setRate(e.target.value)} /></Field></div><Result><div className="text-sm text-slate-500">月の社会保険料目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={contribution} /></div></Result><Breakdown items={[["健康保険・厚生年金・雇用保険等（概算）",contribution],["年間換算",contribution*12]]}/><p className="mt-4 text-xs leading-5 text-slate-500">保険料率は加入先や年度などで変わるため、率を指定する簡易計算です。</p></Card>;
}

function OvertimePay() {
  const [hourly,setHourly]=useState("1500"); const [hours,setHours]=useState("10"); const [rate,setRate]=useState("1.25");
  const pay=(Number(hourly)||0)*(Number(hours)||0)*(Number(rate)||0);
  return <Card><div className="grid gap-4 md:grid-cols-3"><Field label="通常時給（円）"><input className={inputClass} type="number" min="0" value={hourly} onChange={e=>setHourly(e.target.value)}/></Field><Field label="残業時間"><input className={inputClass} type="number" min="0" step="0.5" value={hours} onChange={e=>setHours(e.target.value)}/></Field><Field label="割増率"><select className={inputClass} value={rate} onChange={e=>setRate(e.target.value)}><option value="1.25">1.25倍</option><option value="1.35">1.35倍</option><option value="1.50">1.50倍</option></select></Field></div><Result><div className="text-sm text-slate-500">残業代</div><div className="mt-1 text-3xl text-blue-700"><Money value={pay}/></div></Result><p className="mt-4 text-xs leading-5 text-slate-500">休憩、深夜、休日労働、月60時間超などの複雑な条件は含まない簡易計算です。</p></Card>;
}

function HourlyWage() {
  const [monthly,setMonthly]=useState("300000"); const [hours,setHours]=useState("160");
  const wage=(Number(monthly)||0)/Math.max(1,Number(hours)||1);
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="月給（円）"><input className={inputClass} type="number" min="0" value={monthly} onChange={e=>setMonthly(e.target.value)}/></Field><Field label="月の勤務時間"><input className={inputClass} type="number" min="1" step="0.5" value={hours} onChange={e=>setHours(e.target.value)}/></Field></div><Result><div className="text-sm text-slate-500">実質時給の目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={wage}/></div></Result><p className="mt-4 text-xs leading-5 text-slate-500">月給を実働時間で割った単純計算です。固定残業代などは別途考慮してください。</p></Card>;
}

function salaryDeduction(income:number) {
  if (income <= 1625000) return 550000;
  if (income <= 1800000) return income * 0.4 - 100000;
  if (income <= 3600000) return income * 0.3 + 80000;
  if (income <= 6600000) return income * 0.2 + 440000;
  if (income <= 8500000) return income * 0.1 + 1100000;
  return 1950000;
}

function simpleIncomeTax(taxable:number) {
  if (taxable <= 1950000) return taxable * 0.05;
  if (taxable <= 3300000) return taxable * 0.10 - 97500;
  if (taxable <= 6950000) return taxable * 0.20 - 427500;
  if (taxable <= 9000000) return taxable * 0.23 - 636000;
  if (taxable <= 18000000) return taxable * 0.33 - 1536000;
  if (taxable <= 40000000) return taxable * 0.40 - 2796000;
  return taxable * 0.45 - 4796000;
}

function Row({label,value}:{label:string,value:number}) {
  return <div className="flex justify-between border-b border-slate-100 py-2"><span className="text-slate-500">{label}</span><strong><Money value={value}/></strong></div>;
}
function Breakdown({items}:{items:[string,number][]}) {
  return <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 px-4">{items.map(([label,value])=><Row key={label} label={label} value={value}/>)}</div>;
}

function JsonFormatter() {
  const [value,setValue]=useState('{"name":"Japan Life Tools","version":1}'); const [error,setError]=useState("");
  const format=()=>{try{setValue(JSON.stringify(JSON.parse(value),null,2));setError("")}catch{setError("JSONの形式が正しくありません。")}};
  const minify=()=>{try{setValue(JSON.stringify(JSON.parse(value)));setError("")}catch{setError("JSONの形式が正しくありません。")}};
  return <Card><Field label="JSON"><textarea className={inputClass+" min-h-72 font-mono text-sm"} value={value} onChange={e=>setValue(e.target.value)} /></Field><div className="mt-4 flex gap-3"><button onClick={format} className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700">整形</button><button onClick={minify} className="rounded-xl border px-4 py-2.5 font-semibold hover:bg-slate-50">圧縮</button></div>{error&&<p className="mt-3 text-sm text-red-600">{error}</p>}</Card>;
}

export default function ToolClient({ slug }: { slug: string }) {
  const map: Record<string, React.ReactNode> = {
    "take-home-pay": <TakeHomePay />, "income-tax": <IncomeTax />, "resident-tax": <ResidentTax />, "social-insurance": <SocialInsurance />, "overtime-pay": <OvertimePay />, "hourly-wage": <HourlyWage />, "age-calculator": <AgeCalculator />, "date-difference": <DateDifference />, "date-add-subtract": <DateAddSubtract />,
    "business-days": <BusinessDays />, "tax-calculator": <TaxCalculator />, "discount-calculator": <DiscountCalculator />,
    "split-bill": <SplitBill />, "gas-cost": <GasCost />, "electricity-cost": <ElectricityCost />, "json-formatter": <JsonFormatter />
  };
  return map[slug] ?? <p>ツールが見つかりません。</p>;
}
