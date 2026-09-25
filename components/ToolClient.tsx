"use client";

import { useMemo, useState } from "react";

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
          <input
            className={inputClass}
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </Field>
        <Field label="基準日">
          <input
            className={inputClass}
            type="date"
            value={base}
            onChange={(e) => setBase(e.target.value)}
          />
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
          <input
            className={inputClass}
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </Field>
        <Field label="終了日">
          <input
            className={inputClass}
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
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
          <input
            className={inputClass}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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
          <input
            className={inputClass}
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </Field>
        <Field label="終了日">
          <input
            className={inputClass}
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
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
    "mortgage": <MortgageCalculator />,
    "rent-initial-cost": <RentInitialCostCalculator />,
    "moving-cost": <MovingCostCalculator />,
    "gas-bill": <UtilityCostCalculator kind="gas" />,
    "water-bill": <UtilityCostCalculator kind="water" />,
    "age-calculator": <AgeCalculator />,
    "date-difference": <DateDifference />,
    "date-add-subtract": <DateAddSubtract />,
    "business-days": <BusinessDays />,
    "tax-calculator": <TaxCalculator />,
    "discount-calculator": <DiscountCalculator />,
    "split-bill": <SplitBill />,
    "gas-cost": <GasCost />,
    "electricity-cost": <ElectricityCost />,
    "json-formatter": <JsonFormatter />,
  };
  return map[slug] ?? <p>ツールが見つかりません。</p>;
}
