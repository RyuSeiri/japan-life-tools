"use client";

import { DayPicker } from "react-day-picker";
import { ja } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";
import "react-day-picker/style.css";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      {<span className={labelClass}>{label}</span>}
      {children}
    </label>
  );
}
function Result({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-xl bg-slate-50 p-4 text-center text-lg font-bold">
      {children}
    </div>
  );
}

function JapaneseDatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = value ? new Date(`${value}T00:00:00`) : undefined;
  const formatIso = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const display = value ? value.replaceAll("-", "/") : "日付を選択";
  return (
    <div className="relative">
      <button
        type="button"
        className={`${inputClass} flex items-center justify-between text-left font-medium`}
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span>{display}</span>
        <CalendarDays aria-hidden="true" size={18} className="shrink-0 text-slate-500" />
      </button>
      {open && (
        <div className="absolute z-30 mt-2 rounded-xl border border-slate-200 bg-white p-3 shadow-xl" role="dialog" aria-label="日付を選択">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (!date) return;
              onChange(formatIso(date));
              setOpen(false);
            }}
            locale={ja}
            defaultMonth={selected}
            startMonth={new Date(1900, 0)}
            endMonth={new Date(2100, 11)}
            captionLayout="dropdown"
            navLayout="after"
            showOutsideDays
          />
          <button
            type="button"
            className="mt-2 w-full border border-slate-200 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            onClick={() => {
              onChange(formatIso(new Date()));
              setOpen(false);
            }}
          >
            今日を選択
          </button>
        </div>
      )}
    </div>
  );
}

function AgeCalculator() {
  const [birth, setBirth] = useState("1990-01-01");
  const [base, setBase] = useState(new Date().toISOString().slice(0, 10));
  const result = useMemo(() => {
    const b = new Date(birth + "T00:00:00"),
      d = new Date(base + "T00:00:00");
    if (Number.isNaN(b.getTime()) || Number.isNaN(d.getTime()) || d < b)
      return null;
    let years = d.getFullYear() - b.getFullYear();
    let months = d.getMonth() - b.getMonth();
    let days = d.getDate() - b.getDate();
    if (days < 0) {
      months--;
      const last = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
      days += last;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  }, [birth, base]);
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="生年月日">
          <JapaneseDatePicker value={birth} onChange={setBirth} />
        </Field>
        <Field label="基準日">
          <JapaneseDatePicker value={base} onChange={setBase} />
        </Field>
      </div>
      <Result>
        {result
          ? `${result.years}歳 ${result.months}か月 ${result.days}日`
          : "日付を確認してください"}
      </Result>
    </Card>
  );
}

function DateDifference() {
  const [start, setStart] = useState(new Date().toISOString().slice(0, 10));
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
  const days = useMemo(
    () =>
      Math.round(
        (new Date(end + "T00:00:00").getTime() -
          new Date(start + "T00:00:00").getTime()) /
        86400000,
      ),
    [start, end],
  );
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="開始日">
          <JapaneseDatePicker value={start} onChange={setStart} />
        </Field>
        <Field label="終了日">
          <JapaneseDatePicker value={end} onChange={setEnd} />
        </Field>
      </div>
      <Result>{days >= 0 ? `${days}日` : `-${Math.abs(days)}日`}</Result>
      <p className="mt-3 text-xs text-muted">
        開始日を0日目として経過日数を計算します。
      </p>
    </Card>
  );
}

function DateAddSubtract() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [days, setDays] = useState("30");
  const [mode, setMode] = useState("add");
  const result = useMemo(() => {
    const d = new Date(date + "T00:00:00");
    d.setDate(d.getDate() + (mode === "add" ? Number(days) : -Number(days)));
    return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
  }, [date, days, mode]);
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="基準日">
          <JapaneseDatePicker value={date} onChange={setDate} />
        </Field>
        <Field label="日数">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </Field>
        <Field label="計算">
          <select
            className={inputClass}
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="add">○日後</option>
            <option value="sub">○日前</option>
          </select>
        </Field>
      </div>
      <Result>{result}</Result>
    </Card>
  );
}

function BusinessDays() {
  const [start, setStart] = useState(new Date().toISOString().slice(0, 10));
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));
  const count = useMemo(() => {
    let a = new Date(start + "T00:00:00"),
      b = new Date(end + "T00:00:00");
    if (a > b) [a, b] = [b, a];
    let n = 0;
    for (let d = new Date(a); d <= b; d.setDate(d.getDate() + 1)) {
      const w = d.getDay();
      if (w !== 0 && w !== 6) n++;
    }
    return n;
  }, [start, end]);
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="開始日">
          <JapaneseDatePicker value={start} onChange={setStart} />
        </Field>
        <Field label="終了日">
          <JapaneseDatePicker value={end} onChange={setEnd} />
        </Field>
      </div>
      <Result>{count}営業日</Result>
      <p className="mt-3 text-xs text-muted">
        現在は土日を除外します。日本の祝日データは次の更新で追加予定です。
      </p>
    </Card>
  );
}

function TaxCalculator() {
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("10");
  const taxIncluded = Number(amount) * (1 + Number(rate) / 100);
  const tax = taxIncluded - Number(amount);
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="税抜金額">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Field>
        <Field label="税率">
          <select
            className={inputClass}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          >
            <option value="10">10%</option>
            <option value="8">8%</option>
          </select>
        </Field>
      </div>
      <Result>税込 {Math.round(taxIncluded).toLocaleString()} 円</Result>
      <p className="mt-3 text-center text-sm text-muted">
        消費税額：{Math.round(tax).toLocaleString()} 円
      </p>
    </Card>
  );
}

function DiscountCalculator() {
  const [price, setPrice] = useState("10000");
  const [rate, setRate] = useState("20");
  const discount = (Number(price) * Number(rate)) / 100;
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="元の価格">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Field>
        <Field label="割引率（%）">
          <input
            className={inputClass}
            type="number"
            min="0"
            max="100"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </Field>
      </div>
      <Result>
        割引後 {Math.round(Number(price) - discount).toLocaleString()} 円
      </Result>
      <p className="mt-3 text-center text-sm text-muted">
        割引額：{Math.round(discount).toLocaleString()} 円
      </p>
    </Card>
  );
}

function SplitBill() {
  const [total, setTotal] = useState("30000");
  const [people, setPeople] = useState("4");
  const n = Math.max(1, Number(people));
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="合計金額">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </Field>
        <Field label="人数">
          <input
            className={inputClass}
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </Field>
      </div>
      <Result>
        1人あたり {Math.ceil(Number(total) / n).toLocaleString()} 円
      </Result>
      <p className="mt-3 text-center text-sm text-muted">
        端数は切り上げています。
      </p>
    </Card>
  );
}

function GasCost() {
  const [distance, setDistance] = useState("300");
  const [eff, setEff] = useState("15");
  const [price, setPrice] = useState("175");
  const liters = Number(distance) / Number(eff);
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="走行距離（km）">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </Field>
        <Field label="燃費（km/L）">
          <input
            className={inputClass}
            type="number"
            min="0.1"
            value={eff}
            onChange={(e) => setEff(e.target.value)}
          />
        </Field>
        <Field label="ガソリン単価（円/L）">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Field>
      </div>
      <Result>
        ガソリン代 約 {Math.round(liters * Number(price)).toLocaleString()} 円
      </Result>
      <p className="mt-3 text-center text-sm text-muted">
        使用量：約 {liters.toFixed(1)} L
      </p>
    </Card>
  );
}

function ElectricityCost() {
  const [watts, setWatts] = useState("100");
  const [hours, setHours] = useState("8");
  const [days, setDays] = useState("30");
  const [rate, setRate] = useState("31");
  const kwh = (Number(watts) * Number(hours) * Number(days)) / 1000;
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="消費電力（W）">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={watts}
            onChange={(e) => setWatts(e.target.value)}
          />
        </Field>
        <Field label="1日の使用時間">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </Field>
        <Field label="使用日数 / 月">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </Field>
        <Field label="電気単価（円/kWh）">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </Field>
      </div>
      <Result>
        月額 約 {Math.round(kwh * Number(rate)).toLocaleString()} 円
      </Result>
      <p className="mt-3 text-center text-sm text-muted">
        月間使用量：約 {kwh.toFixed(1)} kWh
      </p>
    </Card>
  );
}

function Money({ value }: { value: number }) {
  return <span>¥{Math.round(value).toLocaleString()}</span>;
}

function TakeHomePay() {
  const [basePay, setBasePay] = useState("570000");
  const [overtimePay, setOvertimePay] = useState("0");
  const [transportation, setTransportation] = useState("0");
  const [healthInsurance, setHealthInsurance] = useState("27580");
  const [pension, setPension] = useState("51240");
  const [employmentInsurance, setEmploymentInsurance] = useState("2850");
  const [childcareSupport, setChildcareSupport] = useState("644");
  const [incomeTax, setIncomeTax] = useState("25740");
  const [residentTax, setResidentTax] = useState("0");
  const value = (amount: string) => Math.max(0, Number(amount) || 0);
  const gross = value(basePay) + value(overtimePay) + value(transportation);
  const social =
    value(healthInsurance) +
    value(pension) +
    value(employmentInsurance) +
    value(childcareSupport);
  const afterSocial = gross - social;
  const taxes = value(incomeTax) + value(residentTax);
  const takeHome = afterSocial - taxes;
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="基本給">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={basePay}
            onChange={(e) => setBasePay(e.target.value)}
          />
        </Field>
        <Field label="残業代">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={overtimePay}
            onChange={(e) => setOvertimePay(e.target.value)}
          />
        </Field>
        <Field label="交通費（非課税）">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={transportation}
            onChange={(e) => setTransportation(e.target.value)}
          />
        </Field>
      </div>

      <div className="mt-7 border-t border-slate-100 pt-6">
        <h2 className="text-base font-bold text-slate-900">社会保険料</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="健康保険料">
            <input
              className={inputClass}
              type="number"
              min="0"
              value={healthInsurance}
              onChange={(e) => setHealthInsurance(e.target.value)}
            />
          </Field>
          <Field label="厚生年金保険料">
            <input
              className={inputClass}
              type="number"
              min="0"
              value={pension}
              onChange={(e) => setPension(e.target.value)}
            />
          </Field>
          <Field label="雇用保険料">
            <input
              className={inputClass}
              type="number"
              min="0"
              value={employmentInsurance}
              onChange={(e) => setEmploymentInsurance(e.target.value)}
            />
          </Field>
          <Field label="子ども・子育て支援金">
            <input
              className={inputClass}
              type="number"
              min="0"
              value={childcareSupport}
              onChange={(e) => setChildcareSupport(e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="mt-7 border-t border-slate-100 pt-6">
        <h2 className="text-base font-bold text-slate-900">税金等</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="所得税">
            <input
              className={inputClass}
              type="number"
              min="0"
              value={incomeTax}
              onChange={(e) => setIncomeTax(e.target.value)}
            />
          </Field>
          <Field label="住民税">
            <input
              className={inputClass}
              type="number"
              min="0"
              value={residentTax}
              onChange={(e) => setResidentTax(e.target.value)}
            />
          </Field>
        </div>
      </div>

      <Result>
        <div className="text-sm font-semibold text-slate-500">
          差引支給額（手取り）
        </div>
        <div className="mt-1 text-3xl text-blue-700">
          <Money value={takeHome} />
        </div>
      </Result>
      <Breakdown
        items={[
          ["支給額", gross],
          ["社会保険料合計", social],
          ["社会保険料控除後", afterSocial],
          ["税金等合計", taxes],
          ["差引支給額（手取り）", takeHome],
        ]}
      />
      <p className="mt-4 text-xs leading-5 text-slate-500">
        給与明細に記載された支給額・控除額を入力して、月ごとの手取りを確認するための計算ツールです。保険料や税額は給与明細をご確認ください。
      </p>
    </Card>
  );
}

function SalaryTakeHome() {
  const [annual, setAnnual] = useState("5000000");
  const [age, setAge] = useState("30");
  const [prefecture, setPrefecture] = useState("東京都");
  const gross = Math.max(0, Number(annual) || 0);
  const healthRate = prefecture === "東京都" ? 0.05 : 0.049;
  const healthInsurance = gross * healthRate;
  const pension = gross * 0.0915;
  const employmentInsurance = gross * 0.0055;
  const social = healthInsurance + pension + employmentInsurance;
  const taxable = Math.max(0, gross - salaryDeduction(gross) - 480000 - social);
  const incomeTax = simpleIncomeTax(taxable);
  const residentTax = Math.max(0, gross - salaryDeduction(gross) - 430000) * 0.1 + 5000;
  const takeHome = Math.max(0, gross - social - incomeTax - residentTax);
  return (
    <Card>
      <div className="border-b border-slate-100 pb-5">
        <p className="text-sm font-bold text-blue-600">給与シミュレーション</p>
        <h2 className="mt-1 text-xl font-black text-slate-900">年収から手取りを計算</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">年収、年齢、都道府県をもとに、税金と社会保険料を含む手取りの目安を表示します。</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Field label="年収（総支給）">
          <input className={inputClass} type="number" min="0" value={annual} onChange={(e) => setAnnual(e.target.value)} />
        </Field>
        <Field label="年齢">
          <input className={inputClass} type="number" min="16" max="100" value={age} onChange={(e) => setAge(e.target.value)} />
        </Field>
        <Field label="都道府県">
          <select className={inputClass} value={prefecture} onChange={(e) => setPrefecture(e.target.value)}>
            <option>東京都</option>
            <option>大阪府</option>
            <option>神奈川県</option>
            <option>その他</option>
          </select>
        </Field>
      </div>
      <Result>
        <div className="text-sm font-semibold text-slate-500">月の手取り目安</div>
        <div className="mt-1 text-3xl text-blue-700"><Money value={takeHome / 12} /></div>
        <div className="mt-2 text-sm font-normal text-slate-500">年齢 {age || "-"}歳・{prefecture}</div>
      </Result>
      <Breakdown items={[["年収", gross], ["所得税の目安", incomeTax], ["住民税の目安", residentTax], ["健康保険の目安", healthInsurance], ["厚生年金の目安", pension], ["雇用保険の目安", employmentInsurance], ["手取り年収の目安", takeHome]]} />
      <p className="mt-4 text-xs leading-5 text-slate-500">実際の保険料や税額は、標準報酬月額、扶養、控除、加入先などで変わります。40歳以上の介護保険料と賞与はこの簡易計算に含まれません。</p>
    </Card>
  );
}

function PensionCalculator() {
  const [monthly, setMonthly] = useState("350000");
  const pension = Math.max(0, Number(monthly) || 0) * 0.0915;
  return <Card><Field label="標準報酬月額の目安"><input className={inputClass} type="number" min="0" value={monthly} onChange={(e) => setMonthly(e.target.value)} /></Field><Result><div className="text-sm text-slate-500">月の厚生年金保険料（本人負担目安）</div><div className="mt-1 text-3xl text-blue-700"><Money value={pension} /></div></Result><Breakdown items={[["月額", pension], ["年間換算", pension * 12]]} /><p className="mt-4 text-xs leading-5 text-slate-500">本人負担率を9.15%として計算した概算です。実際は標準報酬月額等級で決まります。</p></Card>;
}

function EmploymentInsuranceCalculator() {
  const [monthly, setMonthly] = useState("350000");
  const [rate, setRate] = useState("0.55");
  const premium = Math.max(0, Number(monthly) || 0) * Math.max(0, Number(rate) || 0) / 100;
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="月の賃金"><input className={inputClass} type="number" min="0" value={monthly} onChange={(e) => setMonthly(e.target.value)} /></Field><Field label="労働者負担率（%）"><input className={inputClass} type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} /></Field></div><Result><div className="text-sm text-slate-500">月の雇用保険料目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={premium} /></div></Result><p className="mt-4 text-xs leading-5 text-slate-500">保険料率は事業区分・年度によって異なります。給与明細の金額を優先してください。</p></Card>;
}

function AnnualMonthlyConverter() {
  const [annual, setAnnual] = useState("5000000");
  const [bonus, setBonus] = useState("0");
  const yearly = Math.max(0, Number(annual) || 0);
  const bonusAmount = Math.min(yearly, Math.max(0, Number(bonus) || 0));
  const monthly = (yearly - bonusAmount) / 12;
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="年収"><input className={inputClass} type="number" min="0" value={annual} onChange={(e) => setAnnual(e.target.value)} /></Field><Field label="年間ボーナス"><input className={inputClass} type="number" min="0" value={bonus} onChange={(e) => setBonus(e.target.value)} /></Field></div><Result><div className="text-sm text-slate-500">月収（ボーナス除く）</div><div className="mt-1 text-3xl text-blue-700"><Money value={monthly} /></div></Result><Breakdown items={[["年収", yearly], ["年間ボーナス", bonusAmount], ["月収 x 12", monthly * 12]]} /></Card>;
}

function MortgageCalculator() {
  const [principal, setPrincipal] = useState("35000000");
  const [rate, setRate] = useState("0.7");
  const [years, setYears] = useState("35");
  const loan = Math.max(0, Number(principal) || 0);
  const months = Math.max(1, Number(years) || 1) * 12;
  const monthlyRate = Math.max(0, Number(rate) || 0) / 100 / 12;
  const payment = monthlyRate === 0 ? loan / months : loan * monthlyRate * ((1 + monthlyRate) ** months) / (((1 + monthlyRate) ** months) - 1);
  return <Card><div className="grid gap-4 md:grid-cols-3"><Field label="借入金額"><input className={inputClass} type="number" min="0" value={principal} onChange={(e) => setPrincipal(e.target.value)} /></Field><Field label="年利（%）"><input className={inputClass} type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} /></Field><Field label="返済期間（年）"><input className={inputClass} type="number" min="1" value={years} onChange={(e) => setYears(e.target.value)} /></Field></div><Result><div className="text-sm text-slate-500">毎月の返済額目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={payment} /></div></Result><Breakdown items={[["借入金額", loan], ["総返済額", payment * months], ["利息合計", payment * months - loan]]} /><p className="mt-4 text-xs leading-5 text-slate-500">元利均等返済の概算です。諸費用、ボーナス返済、金利変動は含みません。</p></Card>;
}

function RentInitialCostCalculator() {
  const [rent, setRent] = useState("100000");
  const [deposit, setDeposit] = useState("1");
  const [keyMoney, setKeyMoney] = useState("1");
  const [fee, setFee] = useState("1");
  const value = (amount: string) => Math.max(0, Number(amount) || 0);
  const monthly = value(rent);
  const total = monthly * (1 + value(deposit) + value(keyMoney) + value(fee)) + monthly * 0.5 + 20000;
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="月額家賃"><input className={inputClass} type="number" min="0" value={rent} onChange={(e) => setRent(e.target.value)} /></Field><Field label="敷金（月数）"><input className={inputClass} type="number" min="0" step="0.5" value={deposit} onChange={(e) => setDeposit(e.target.value)} /></Field><Field label="礼金（月数）"><input className={inputClass} type="number" min="0" step="0.5" value={keyMoney} onChange={(e) => setKeyMoney(e.target.value)} /></Field><Field label="仲介手数料（月数）"><input className={inputClass} type="number" min="0" step="0.1" value={fee} onChange={(e) => setFee(e.target.value)} /></Field></div><Result><div className="text-sm text-slate-500">契約時の初期費用目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={total} /></div></Result><p className="mt-4 text-xs leading-5 text-slate-500">前家賃1か月、火災保険等20,000円、保証料0.5か月を含む概算です。物件の請求内容をご確認ください。</p></Card>;
}

function MovingCostCalculator() {
  const [people, setPeople] = useState("1");
  const [distance, setDistance] = useState("20");
  const [season, setSeason] = useState("normal");
  const base = (Number(people) || 1) * 30000 + (Number(distance) || 0) * 180;
  const multiplier = season === "peak" ? 1.5 : season === "busy" ? 1.25 : 1;
  const total = base * multiplier;
  return <Card><div className="grid gap-4 md:grid-cols-3"><Field label="人数"><input className={inputClass} type="number" min="1" value={people} onChange={(e) => setPeople(e.target.value)} /></Field><Field label="移動距離（km）"><input className={inputClass} type="number" min="0" value={distance} onChange={(e) => setDistance(e.target.value)} /></Field><Field label="時期"><select className={inputClass} value={season} onChange={(e) => setSeason(e.target.value)}><option value="normal">通常期</option><option value="busy">繁忙期</option><option value="peak">3〜4月</option></select></Field></div><Result><div className="text-sm text-slate-500">引越し費用の目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={total} /></div></Result><p className="mt-4 text-xs leading-5 text-slate-500">荷物量、建物条件、距離、日時で大きく変わります。複数社の見積もりでご確認ください。</p></Card>;
}

function UtilityCostCalculator({ kind }: { kind: "gas" | "water" }) {
  const [usage, setUsage] = useState(kind === "gas" ? "25" : "20");
  const [basic, setBasic] = useState(kind === "gas" ? "1100" : "900");
  const [rate, setRate] = useState(kind === "gas" ? "180" : "180");
  const total = Math.max(0, Number(basic) || 0) + Math.max(0, Number(usage) || 0) * Math.max(0, Number(rate) || 0);
  const label = kind === "gas" ? "ガス" : "水道";
  const unit = kind === "gas" ? "m³" : "m³";
  return <Card><div className="grid gap-4 md:grid-cols-3"><Field label={`使用量（${unit}）`}><input className={inputClass} type="number" min="0" step="0.1" value={usage} onChange={(e) => setUsage(e.target.value)} /></Field><Field label="基本料金"><input className={inputClass} type="number" min="0" value={basic} onChange={(e) => setBasic(e.target.value)} /></Field><Field label="従量料金（円 / m³）"><input className={inputClass} type="number" min="0" value={rate} onChange={(e) => setRate(e.target.value)} /></Field></div><Result><div className="text-sm text-slate-500">月の{label}料金目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={total} /></div></Result><p className="mt-4 text-xs leading-5 text-slate-500">料金体系は地域・契約プラン・使用量の段階制で異なります。請求額の確認用にお使いください。</p></Card>;
}

function IncomeTax() {
  const [annual, setAnnual] = useState("5000000");
  const income = Math.max(0, Number(annual) || 0);
  const salaryIncome = Math.max(0, income - salaryDeduction(income));
  const taxable = Math.max(0, salaryIncome - 480000);
  const tax = simpleIncomeTax(taxable);
  return (
    <Card>
      <Field label="給与収入（年収）">
        <input
          className={inputClass}
          type="number"
          min="0"
          value={annual}
          onChange={(e) => setAnnual(e.target.value)}
        />
      </Field>
      <Result>
        <div className="text-sm text-slate-500">所得税の目安</div>
        <div className="mt-1 text-3xl text-blue-700">
          <Money value={tax} />
        </div>
      </Result>
      <div className="mt-5 space-y-2 text-sm">
        <Row label="給与所得控除後の所得" value={salaryIncome} />
        <Row label="基礎控除後の課税所得（簡易）" value={taxable} />
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        扶養控除、配偶者控除、医療費控除などは含まない簡易計算です。実際の税額とは異なる場合があります。
      </p>
    </Card>
  );
}

function ResidentTax() {
  const [annual, setAnnual] = useState("5000000");
  const income = Math.max(0, Number(annual) || 0);
  const salaryIncome = Math.max(0, income - salaryDeduction(income));
  const taxable = Math.max(0, salaryIncome - 430000);
  const tax = taxable * 0.1 + 5000;
  return (
    <Card>
      <Field label="前年の給与収入（年収）">
        <input
          className={inputClass}
          type="number"
          min="0"
          value={annual}
          onChange={(e) => setAnnual(e.target.value)}
        />
      </Field>
      <Result>
        <div className="text-sm text-slate-500">住民税の年額目安</div>
        <div className="mt-1 text-3xl text-blue-700">
          <Money value={tax} />
        </div>
        <div className="mt-2 text-sm font-normal text-slate-500">
          月平均 約 <Money value={tax / 12} />
        </div>
      </Result>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        均等割・所得割を単純化した概算です。自治体、扶養、控除などによって実際の住民税は変わります。
      </p>
    </Card>
  );
}

function SocialInsurance() {
  const [monthly, setMonthly] = useState("350000");
  const [rate, setRate] = useState("15");
  const amount = Math.max(0, Number(monthly) || 0);
  const contribution = (amount * (Number(rate) || 0)) / 100;
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="標準報酬月額の目安">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
          />
        </Field>
        <Field label="本人負担率（概算）">
          <input
            className={inputClass}
            type="number"
            min="0"
            max="30"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </Field>
      </div>
      <Result>
        <div className="text-sm text-slate-500">月の社会保険料目安</div>
        <div className="mt-1 text-3xl text-blue-700">
          <Money value={contribution} />
        </div>
      </Result>
      <Breakdown
        items={[
          ["健康保険・厚生年金・雇用保険等（概算）", contribution],
          ["年間換算", contribution * 12],
        ]}
      />
      <p className="mt-4 text-xs leading-5 text-slate-500">
        保険料率は加入先や年度などで変わるため、率を指定する簡易計算です。
      </p>
    </Card>
  );
}

function OvertimePay() {
  const [hourly, setHourly] = useState("1500");
  const [hours, setHours] = useState("10");
  const [rate, setRate] = useState("1.25");
  const pay =
    (Number(hourly) || 0) * (Number(hours) || 0) * (Number(rate) || 0);
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="通常時給（円）">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={hourly}
            onChange={(e) => setHourly(e.target.value)}
          />
        </Field>
        <Field label="残業時間">
          <input
            className={inputClass}
            type="number"
            min="0"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </Field>
        <Field label="割増率">
          <select
            className={inputClass}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          >
            <option value="1.25">1.25倍</option>
            <option value="1.35">1.35倍</option>
            <option value="1.50">1.50倍</option>
          </select>
        </Field>
      </div>
      <Result>
        <div className="text-sm text-slate-500">残業代</div>
        <div className="mt-1 text-3xl text-blue-700">
          <Money value={pay} />
        </div>
      </Result>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        休憩、深夜、休日労働、月60時間超などの複雑な条件は含まない簡易計算です。
      </p>
    </Card>
  );
}

function HourlyWage() {
  const [monthly, setMonthly] = useState("300000");
  const [hours, setHours] = useState("160");
  const wage = (Number(monthly) || 0) / Math.max(1, Number(hours) || 1);
  return (
    <Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="月給（円）">
          <input
            className={inputClass}
            type="number"
            min="0"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
          />
        </Field>
        <Field label="月の勤務時間">
          <input
            className={inputClass}
            type="number"
            min="1"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </Field>
      </div>
      <Result>
        <div className="text-sm text-slate-500">実質時給の目安</div>
        <div className="mt-1 text-3xl text-blue-700">
          <Money value={wage} />
        </div>
      </Result>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        月給を実働時間で割った単純計算です。固定残業代などは別途考慮してください。
      </p>
    </Card>
  );
}

function WorkPremiumCalculator({ type }: { type: "hours" | "night" | "holiday" }) {
  const [hourly, setHourly] = useState("1500");
  const [hours, setHours] = useState("10");
  const [days, setDays] = useState("1");
  const multiplier = type === "night" ? 1.5 : type === "holiday" ? 1.35 : 1;
  const totalHours = Math.max(0, Number(hours) || 0) * Math.max(1, Number(days) || 1);
  const pay = Math.max(0, Number(hourly) || 0) * totalHours * multiplier;
  const title = type === "hours" ? "残業時間" : type === "night" ? "深夜残業代" : "休日出勤手当";
  return <Card><div className="grid gap-4 md:grid-cols-3"><Field label="通常時給"><input className={inputClass} type="number" min="0" value={hourly} onChange={(e) => setHourly(e.target.value)} /></Field><Field label={type === "hours" ? "1日の残業時間" : "1日の勤務時間"}><input className={inputClass} type="number" min="0" step="0.25" value={hours} onChange={(e) => setHours(e.target.value)} /></Field><Field label="日数"><input className={inputClass} type="number" min="1" value={days} onChange={(e) => setDays(e.target.value)} /></Field></div><Result><div className="text-sm text-slate-500">{type === "hours" ? "合計残業時間" : title}</div><div className="mt-1 text-3xl text-blue-700">{type === "hours" ? `${totalHours.toLocaleString()} 時間` : <Money value={pay} />}</div></Result><p className="mt-4 text-xs leading-5 text-slate-500">{type === "night" ? "22時から5時の深夜割増を含む1.5倍の簡易計算です。" : type === "holiday" ? "法定休日の割増率35%を用いた簡易計算です。" : "休憩時間を除いた合計時間です。"}</p></Card>;
}

function PaidLeaveCalculator() {
  const [years, setYears] = useState("3");
  const [days, setDays] = useState("5");
  const serviceYears = Math.max(0, Number(years) || 0);
  const granted = serviceYears < 0.5 ? 0 : serviceYears < 1.5 ? 10 : serviceYears < 2.5 ? 11 : serviceYears < 3.5 ? 12 : serviceYears < 4.5 ? 14 : serviceYears < 5.5 ? 16 : serviceYears < 6.5 ? 18 : 20;
  const used = Math.max(0, Number(days) || 0);
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="勤続年数"><input className={inputClass} type="number" min="0" step="0.5" value={years} onChange={(e) => setYears(e.target.value)} /></Field><Field label="取得済み日数"><input className={inputClass} type="number" min="0" step="0.5" value={days} onChange={(e) => setDays(e.target.value)} /></Field></div><Result><div className="text-sm text-slate-500">有給休暇の残日数目安</div><div className="mt-1 text-3xl text-blue-700">{Math.max(0, granted - used)} 日</div></Result><Breakdown items={[["法定付与日数の目安", granted], ["取得済み日数", used]]} /><p className="mt-4 text-xs leading-5 text-slate-500">週5日以上勤務・出勤率8割以上の場合の法定付与日数です。繰越分や所定労働日数は考慮していません。</p></Card>;
}

function ChildcareBenefitCalculator() {
  const [salary, setSalary] = useState("300000");
  const [months, setMonths] = useState("6");
  const monthly = Math.max(0, Number(salary) || 0);
  const period = Math.max(0, Number(months) || 0);
  const benefit = monthly * period * (period <= 6 ? 0.67 : 0.5);
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="休業開始前の月額賃金"><input className={inputClass} type="number" min="0" value={salary} onChange={(e) => setSalary(e.target.value)} /></Field><Field label="給付対象月数"><input className={inputClass} type="number" min="0" value={months} onChange={(e) => setMonths(e.target.value)} /></Field></div><Result><div className="text-sm text-slate-500">育児休業給付の目安</div><div className="mt-1 text-3xl text-blue-700"><Money value={benefit} /></div></Result><p className="mt-4 text-xs leading-5 text-slate-500">開始から180日までは67%、以降は50%として計算した概算です。支給上限、賃金支払、制度改定は含みません。</p></Card>;
}

function LifeCostCalculator({ type }: { type: "deposit" | "ratio" | "commuter" | "car" | "nhk" }) {
  const [first, setFirst] = useState(type === "car" ? "300000" : type === "commuter" ? "1200" : type === "nhk" ? "1100" : "100000");
  const [second, setSecond] = useState(type === "ratio" ? "350000" : type === "commuter" ? "20" : type === "car" ? "50000" : "1");
  const [third, setThird] = useState(type === "car" ? "40000" : type === "commuter" ? "18000" : "1");
  const a = Math.max(0, Number(first) || 0), b = Math.max(0, Number(second) || 0), c = Math.max(0, Number(third) || 0);
  const result = type === "deposit" ? a * (b + c) : type === "ratio" ? a / Math.max(1, b) * 100 : type === "commuter" ? a * b - c : type === "car" ? a / 12 + b / 12 + c / 12 : a * 12;
  const title = type === "deposit" ? "敷金・礼金の合計" : type === "ratio" ? "家賃の手取り比率" : type === "commuter" ? "定期券との差額（月額）" : type === "car" ? "車の年間維持費（月平均）" : "NHK受信料（年額目安）";
  const labels = type === "deposit" ? ["家賃", "敷金（月数）", "礼金（月数）"] : type === "ratio" ? ["月額家賃", "月の手取り", "予備"] : type === "commuter" ? ["片道運賃", "出勤日数", "定期券（月額）"] : type === "car" ? ["自動車税（年額）", "保険料（年額）", "車検・整備（年額）"] : ["月額受信料", "予備", "予備"];
  return <Card><div className="grid gap-4 md:grid-cols-3"><Field label={labels[0]}><input className={inputClass} type="number" min="0" value={first} onChange={(e) => setFirst(e.target.value)} /></Field><Field label={labels[1]}><input className={inputClass} type="number" min="0" value={second} onChange={(e) => setSecond(e.target.value)} /></Field>{type !== "nhk" && <Field label={labels[2]}><input className={inputClass} type="number" min="0" value={third} onChange={(e) => setThird(e.target.value)} /></Field>}</div><Result><div className="text-sm text-slate-500">{title}</div><div className="mt-1 text-3xl text-blue-700">{type === "ratio" ? `${result.toFixed(1)}%` : <Money value={result} />}</div></Result><p className="mt-4 text-xs leading-5 text-slate-500">地域・契約・勤務日数・車種などで実額は変わります。比較の目安としてご利用ください。</p></Card>;
}

function DateUtility({ type }: { type: "service" | "resignation" | "maternity" | "due" | "pregnancy" | "baby" | "nursery" | "leave" | "month-edge" | "era" | "zodiac" }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(type === "era" || type === "zodiac" ? "1990" : type === "month-edge" ? today.slice(0, 7) : "2023-04-01");
  const [base, setBase] = useState(today);
  const parsed = new Date(`${date.length === 7 ? `${date}-01` : date}T00:00:00`);
  const reference = new Date(`${base}T00:00:00`);
  const days = Math.floor((reference.getTime() - parsed.getTime()) / 86400000);
  const addDays = (amount: number) => { const result = new Date(parsed); result.setDate(result.getDate() + amount); return result.toLocaleDateString("ja-JP"); };
  const year = Math.max(1, Number(date) || 1);
  const zodiacs = ["申", "酉", "戌", "亥", "子", "丑", "寅", "卯", "辰", "巳", "午", "未"];
  const era = year >= 2019 ? `令和${year - 2018}年` : year >= 1989 ? `平成${year - 1988}年` : year >= 1926 ? `昭和${year - 1925}年` : `${year}年`;
  const details = type === "service" ? `${Math.max(0, Math.floor(days / 365.2425))}年 ${Math.max(0, Math.floor(days % 365.2425 / 30.44))}か月` : type === "resignation" ? addDays(14) : type === "maternity" ? `${addDays(-42)} 〜 ${addDays(56)}` : type === "due" ? addDays(280) : type === "pregnancy" ? `${Math.max(0, Math.floor(days / 7))}週 ${Math.max(0, days % 7)}日` : type === "baby" ? `${Math.max(0, Math.floor(days / 30.44))}か月` : type === "nursery" ? `${reference.getFullYear() - parsed.getFullYear() - (reference < new Date(reference.getFullYear(), parsed.getMonth(), parsed.getDate()) ? 1 : 0)}歳` : type === "leave" ? `${parsed.toLocaleDateString("ja-JP")} 〜 ${addDays(365)}` : type === "month-edge" ? `${new Date(parsed.getFullYear(), parsed.getMonth(), 1).toLocaleDateString("ja-JP")} 〜 ${new Date(parsed.getFullYear(), parsed.getMonth() + 1, 0).toLocaleDateString("ja-JP")}` : type === "era" ? era : `${year}年は${zodiacs[year % 12]}年`;
  const label = type === "era" || type === "zodiac" ? "西暦" : type === "month-edge" ? "年月" : type === "due" || type === "pregnancy" ? "最終月経開始日" : type === "baby" || type === "nursery" || type === "leave" ? "生年月日" : type === "maternity" ? "出産予定日" : type === "resignation" ? "退職を伝える日" : "入社日";
  const resultTitle = type === "service" ? "勤続年数" : type === "resignation" ? "退職日の目安" : type === "maternity" ? "産休期間の目安" : type === "due" ? "出産予定日" : type === "pregnancy" ? "妊娠週数" : type === "baby" ? "月齢" : type === "nursery" ? "基準日時点の年齢" : type === "leave" ? "育休期間の目安" : type === "month-edge" ? "月初・月末" : type === "era" ? "和暦" : "干支";
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label={label}>{type === "era" || type === "zodiac" ? <input className={inputClass} type="number" value={date} onChange={(e) => setDate(e.target.value)} /> : type === "month-edge" ? <input className={inputClass} type="month" value={date} onChange={(e) => setDate(e.target.value)} /> : <JapaneseDatePicker value={date} onChange={setDate} />}</Field>{!["era", "zodiac", "month-edge", "maternity", "due", "leave"].includes(type) && <Field label="基準日"><JapaneseDatePicker value={base} onChange={setBase} /></Field>}</div><Result><div className="text-sm text-slate-500">{resultTitle}</div><div className="mt-1 text-2xl text-blue-700">{details}</div></Result><p className="mt-4 text-xs leading-5 text-slate-500">制度上の日数・年齢の扱いは用途によって異なる場合があります。公的な手続きでは提出先の案内をご確認ください。</p></Card>;
}

function ChildAllowanceCalculator() {
  const [children, setChildren] = useState("1");
  const [age, setAge] = useState("2");
  const count = Math.max(0, Number(children) || 0), childAge = Math.max(0, Number(age) || 0);
  const perChild = childAge < 3 ? 15000 : childAge < 18 ? 10000 : 0;
  return <Card><div className="grid gap-4 md:grid-cols-2"><Field label="対象児童数"><input className={inputClass} type="number" min="0" value={children} onChange={(e) => setChildren(e.target.value)} /></Field><Field label="児童の年齢"><input className={inputClass} type="number" min="0" value={age} onChange={(e) => setAge(e.target.value)} /></Field></div><Result><div className="text-sm text-slate-500">児童手当（月額目安）</div><div className="mt-1 text-3xl text-blue-700"><Money value={perChild * count} /></div></Result><p className="mt-4 text-xs leading-5 text-slate-500">年齢のみを用いた簡易計算です。所得要件・第3子以降の加算・制度改定は自治体の案内をご確認ください。</p></Card>;
}

function HolidayCalculator() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const day = new Date(`${date}T00:00:00`);
  const nthMonday = (month: number, nth: number) => {
    const first = new Date(day.getFullYear(), month, 1);
    return 1 + ((8 - first.getDay()) % 7) + (nth - 1) * 7;
  };
  const fixed: Record<string, string> = { "1-1": "元日", "2-11": "建国記念の日", "2-23": "天皇誕生日", "4-29": "昭和の日", "5-3": "憲法記念日", "5-4": "みどりの日", "5-5": "こどもの日", "8-11": "山の日", "11-3": "文化の日", "11-23": "勤労感謝の日" };
  const key = `${day.getMonth() + 1}-${day.getDate()}`;
  const vernal = Math.floor(20.8431 + 0.242194 * (day.getFullYear() - 1980) - Math.floor((day.getFullYear() - 1980) / 4));
  const autumn = Math.floor(23.2488 + 0.242194 * (day.getFullYear() - 1980) - Math.floor((day.getFullYear() - 1980) / 4));
  const holiday = fixed[key] ?? (day.getMonth() === 0 && day.getDate() === nthMonday(0, 2) ? "成人の日" : day.getMonth() === 6 && day.getDate() === nthMonday(6, 3) ? "海の日" : day.getMonth() === 8 && day.getDate() === nthMonday(8, 3) ? "敬老の日" : day.getMonth() === 9 && day.getDate() === nthMonday(9, 2) ? "スポーツの日" : day.getMonth() === 2 && day.getDate() === vernal ? "春分の日" : day.getMonth() === 8 && day.getDate() === autumn ? "秋分の日" : "");
  return <Card><Field label="確認したい日"><JapaneseDatePicker value={date} onChange={setDate} /></Field><Result><div className="text-sm text-slate-500">祝日判定</div><div className="mt-1 text-3xl text-blue-700">{holiday || "祝日ではありません"}</div></Result><p className="mt-4 text-xs leading-5 text-slate-500">主な国民の祝日を判定します。振替休日・国民の休日・一時的な祝日の扱いは含みません。</p></Card>;
}

function salaryDeduction(income: number) {
  if (income <= 1625000) return 550000;
  if (income <= 1800000) return income * 0.4 - 100000;
  if (income <= 3600000) return income * 0.3 + 80000;
  if (income <= 6600000) return income * 0.2 + 440000;
  if (income <= 8500000) return income * 0.1 + 1100000;
  return 1950000;
}

function simpleIncomeTax(taxable: number) {
  if (taxable <= 1950000) return taxable * 0.05;
  if (taxable <= 3300000) return taxable * 0.1 - 97500;
  if (taxable <= 6950000) return taxable * 0.2 - 427500;
  if (taxable <= 9000000) return taxable * 0.23 - 636000;
  if (taxable <= 18000000) return taxable * 0.33 - 1536000;
  if (taxable <= 40000000) return taxable * 0.4 - 2796000;
  return taxable * 0.45 - 4796000;
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between border-b border-slate-100 py-2">
      <span className="text-slate-500">{label}</span>
      <strong>
        <Money value={value} />
      </strong>
    </div>
  );
}
function Breakdown({ items }: { items: [string, number][] }) {
  return (
    <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 px-4">
      {items.map(([label, value]) => (
        <Row key={label} label={label} value={value} />
      ))}
    </div>
  );
}

function JsonFormatter() {
  const [value, setValue] = useState('{"name":"Japan Life Tools","version":1}');
  const [error, setError] = useState("");
  const format = () => {
    try {
      setValue(JSON.stringify(JSON.parse(value), null, 2));
      setError("");
    } catch {
      setError("JSONの形式が正しくありません。");
    }
  };
  const minify = () => {
    try {
      setValue(JSON.stringify(JSON.parse(value)));
      setError("");
    } catch {
      setError("JSONの形式が正しくありません。");
    }
  };
  return (
    <Card>
      <Field label="JSON">
        <textarea
          className={inputClass + " min-h-72 font-mono text-sm"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Field>
      <div className="mt-4 flex gap-3">
        <button
          onClick={format}
          className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700"
        >
          整形
        </button>
        <button
          onClick={minify}
          className="rounded-xl border border-slate-200 px-4 py-2.5 font-semibold hover:bg-slate-50"
        >
          圧縮
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </Card>
  );
}

export default function ToolClient({ slug }: { slug: string }) {
  const map: Record<string, React.ReactNode> = {
    "take-home-pay": <TakeHomePay />,
    "salary-take-home": <SalaryTakeHome />,
    "income-tax": <IncomeTax />,
    "resident-tax": <ResidentTax />,
    "social-insurance": <SocialInsurance />,
    "overtime-pay": <OvertimePay />,
    "hourly-wage": <HourlyWage />,
    "pension-premium": <PensionCalculator />,
    "employment-insurance": <EmploymentInsuranceCalculator />,
    "annual-monthly": <AnnualMonthlyConverter />,
    "paid-leave": <PaidLeaveCalculator />,
    "overtime-hours": <WorkPremiumCalculator type="hours" />,
    "night-overtime": <WorkPremiumCalculator type="night" />,
    "holiday-work": <WorkPremiumCalculator type="holiday" />,
    "resignation-date": <DateUtility type="resignation" />,
    "service-years": <DateUtility type="service" />,
    "childcare-benefit": <ChildcareBenefitCalculator />,
    "maternity-leave": <DateUtility type="maternity" />,
    "mortgage": <MortgageCalculator />,
    "rent-initial-cost": <RentInitialCostCalculator />,
    "moving-cost": <MovingCostCalculator />,
    "gas-bill": <UtilityCostCalculator kind="gas" />,
    "water-bill": <UtilityCostCalculator kind="water" />,
    "deposit-key-money": <LifeCostCalculator type="deposit" />,
    "rent-income-ratio": <LifeCostCalculator type="ratio" />,
    "commuter-pass": <LifeCostCalculator type="commuter" />,
    "car-ownership": <LifeCostCalculator type="car" />,
    "nhk-fee": <LifeCostCalculator type="nhk" />,
    "age-calculator": <AgeCalculator />,
    "date-difference": <DateDifference />,
    "date-add-subtract": <DateAddSubtract />,
    "business-days": <BusinessDays />,
    "japanese-era": <DateUtility type="era" />,
    "zodiac": <DateUtility type="zodiac" />,
    "month-edges": <DateUtility type="month-edge" />,
    "japanese-holiday": <HolidayCalculator />,
    "due-date": <DateUtility type="due" />,
    "pregnancy-weeks": <DateUtility type="pregnancy" />,
    "baby-age": <DateUtility type="baby" />,
    "nursery-age": <DateUtility type="nursery" />,
    "parental-leave": <DateUtility type="leave" />,
    "child-allowance": <ChildAllowanceCalculator />,
    "tax-calculator": <TaxCalculator />,
    "discount-calculator": <DiscountCalculator />,
    "split-bill": <SplitBill />,
    "gas-cost": <GasCost />,
    "electricity-cost": <ElectricityCost />,
    "json-formatter": <JsonFormatter />,
  };
  return map[slug] ?? <p>ツールが見つかりません。</p>;
}
