import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FinancialCalculator = ({ carDetail }) => {
  const [carprice, setCarPrice] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTearm, setLoanTearm] = useState(0);
  const [dowmPayment, setDowmPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const CalculateMonthlyPaument = () => {
    const principal = carprice - dowmPayment;
    const MonthlyInterestRate = interestRate / 1200;
    const MonthlyPayment =
      (principal *
        MonthlyInterestRate *
        Math.pow(1 + MonthlyInterestRate, loanTearm)) /
      (Math.pow(1 + MonthlyInterestRate, loanTearm) - 1);
    setMonthlyPayment(MonthlyPayment.toFixed(2));
  };
  return (
    <div className="rounded-xl border shadow-md mt-7 ">
      {carDetail ? (
        <div className="p-10">
          <h2 className="font-medium m-3 text-xl md:text-2xl">
            Financial Calculator
          </h2>
          <div className="flex gap-5 mt-5">
            <div className="w-full">
              <label>Price $</label>
              <Input
                type="number"
                onChange={(e) => setCarPrice(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label>Interset Rate</label>
              <Input
                type="number"
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-5 mt-5">
            <div className="w-full">
              <label>Loan Term (Months)</label>
              <Input
                type="number"
                onChange={(e) => setLoanTearm(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label>Down Payment</label>
              return{" "}
              <Input
                type="number"
                onChange={(e) => setDowmPayment(e.target.value)}
              />
            </div>
          </div>
          {monthlyPayment > 0 && (
            <h2 className="font-medium text-xl md:2xl ">
              Your Monthly Payment Is :{" "}
              <span className=" font-bold text-2xl md:text-3xl">
                {monthlyPayment}
              </span>
            </h2>
          )}

          <Button
            size="lg"
            className="w-full mt-5"
            onClick={CalculateMonthlyPaument}
          >
            Calculate
          </Button>
        </div>
      ) : (
        <div className=" bg-slate-200 shadow-none animate-pulse w-full h-[200px] "></div>
      )}
    </div>
  );
};

export default FinancialCalculator;
