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

function JsonFormatter() {
  const [value,setValue]=useState('{"name":"Japan Life Tools","version":1}'); const [error,setError]=useState("");
  const format=()=>{try{setValue(JSON.stringify(JSON.parse(value),null,2));setError("")}catch{setError("JSONの形式が正しくありません。")}};
  const minify=()=>{try{setValue(JSON.stringify(JSON.parse(value)));setError("")}catch{setError("JSONの形式が正しくありません。")}};
  return <Card><Field label="JSON"><textarea className={inputClass+" min-h-72 font-mono text-sm"} value={value} onChange={e=>setValue(e.target.value)} /></Field><div className="mt-4 flex gap-3"><button onClick={format} className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700">整形</button><button onClick={minify} className="rounded-xl border px-4 py-2.5 font-semibold hover:bg-slate-50">圧縮</button></div>{error&&<p className="mt-3 text-sm text-red-600">{error}</p>}</Card>;
}

export default function ToolClient({ slug }: { slug: string }) {
  const map: Record<string, React.ReactNode> = {
    "age-calculator": <AgeCalculator />, "date-difference": <DateDifference />, "date-add-subtract": <DateAddSubtract />,
    "business-days": <BusinessDays />, "tax-calculator": <TaxCalculator />, "discount-calculator": <DiscountCalculator />,
    "split-bill": <SplitBill />, "gas-cost": <GasCost />, "electricity-cost": <ElectricityCost />, "json-formatter": <JsonFormatter />
  };
  return map[slug] ?? <p>ツールが見つかりません。</p>;
}
