import { useState, useEffect } from "react";

const App = () => {
  // Input states
  const [bill, setBill] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  // Error states
  const [billError, setBillError] = useState("");
  const [peopleError, setPeopleError] = useState("");
  const [tipError, setTipError] = useState("");
  // Calculated values states
  const [tipAmount, setTipAmount] = useState(0);
  const [totalPerPerson, setTotalPerPerson] = useState(0);

  // Effect to calculate tip and total per person
  useEffect(() => {
    const billNum = parseFloat(bill);
    const peopleNum = parseInt(numberOfPeople);
    const tipNum = parseFloat(tipPercentage);

    if (billNum > 0 && peopleNum > 0 && tipNum > 0) {
      const tipPerPerson = (billNum * (tipNum / 100)) / peopleNum;
      const totalTip = billNum * (tipNum / 100);
      const total = (billNum + totalTip) / peopleNum;
      setTipAmount(tipPerPerson);
      setTotalPerPerson(total);
    } else {
      setTipAmount(0);
      setTotalPerPerson(0);
    }
  }, [bill, numberOfPeople, tipPercentage]);

  // function to handle (bill) input changes and validations
  const handleBillInput = (value) => {
    const n = parseFloat(value);
    if (isNaN(n) || n < 0) setBillError("Only positive numbers allowed");
    else if (n === 0) setBillError("Can't be zero");
    else setBillError("");
    setBill(value);
  };

  // function to handle (number of people) input changes and validations
  const handlePeopleInput = (value) => {
    const n = parseInt(value);
    if (isNaN(n) || n < 0) setPeopleError("Only positive numbers allowed");
    else if (n === 0) setPeopleError("Can't be zero");
    else setPeopleError("");
    setNumberOfPeople(value);
  };

  // function to handle (Custom tip percentage) input changes and validations
  const handleCustomTipInput = (value) => {
    const n = parseFloat(value);
    if (isNaN(n)) { setTipError("Tip percentage must be a valid number"); setTipPercentage(""); return; }
    if (n <= 0) { setTipError("Tip percentage must be greater than 0"); setTipPercentage(""); return; }
    if (n > 100) { setTipError("Tip percentage can't exceed 100%"); setTipPercentage(""); return; }
    setTipError("");
    setTipPercentage(n);
  };

  // function to handle reset button click
  const reset = () => {
    setBill("");
    setTipPercentage("");
    setNumberOfPeople("");
    setBillError("");
    setPeopleError("");
    setTipError("");
    setTipAmount(0);
    setTotalPerPerson(0);
  };

  return (
    <main className="flex flex-col items-center justify-center bg-[#C5E4E7] pt-20 md:pt-40 pb-0 md:pb-50" >
      <img src="./images/logo.svg" alt="logo" />
      <section className="flex flex-col md:flex-row bg-white rounded-t-4xl md:rounded-3xl shadow-lg p-8 w-full md:w-[900px] mt-20 gap-4">
        
        {/* Bill & people inputs section */}
        <section className="flex flex-col w-full p-2 md:p-5">
          <div className="flex flex-col mb-8 " >
            <div className="flex items-center justify-between">
              <label htmlFor="bill" className="text-[#717D7D] font-bold">Bill</label>
              <p className="text-[#FF5252] font-bold text-sm">{billError}</p>
            </div>
            <div className="relative bg-[#F3F8FB] rounded-lg gap-1 text-[#00474B] font-bold text-2xl mt-1">
              <img src="./images/icon-dollar.svg" alt="icon" className="top-4 left-4 absolute pointer-events-none"/>
              <input type="text" id="bill" placeholder="0" value={bill} onChange={(e) => handleBillInput(e.target.value)} className={`w-full h-full border-none text-right py-2 pr-4 ${billError ? "outline-[#FF5252]" : "outline-[#26C2AD]"}`} />
            </div>
          </div>
          <p className="text-[#717D7D] font-bold mb-4">Select Tip %</p>
          {tipError && ( <p className="text-[#FF5252] font-bold text-sm mb-1">{tipError}</p>)}
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[5, 10, 15, 25, 50].map((p) => (
              <button key={p} type="button" onClick={() => setTipPercentage(p)} className={`font-bold text-2xl rounded-lg py-2 ${tipPercentage === p ? "bg-[#26C2AD] text-[#00474B]" : "bg-[#00474B] text-white"} hover:bg-[#9FE8DF] hover:text-[#00474B]`} >
                {p}%
              </button>
            ))}
            <input value={tipPercentage} onChange={(e) => handleCustomTipInput(e.target.value)} type="text" className="bg-[#F3F9FA] text-[#00474B] text-2xl font-bold outline-[#26C2AD] text-right rounded-lg py-2 px-2 placeholder:text-[#547878] placeholder:font-bold" placeholder="Custom" />
          </div>        
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="number-of-people" className="text-[#717D7D] font-bold "> Number of People </label>
              <p className="text-[#FF5252] font-bold text-sm">{peopleError}</p>
            </div>            
            <div className="relative bg-[#F3F8FB] rounded-lg gap-1 text-[#00474B] font-bold text-2xl mt-1">
              <img src="./images/icon-person.svg" alt="icon" className="top-4.5 left-4 absolute pointer-events-none"/>
              <input type="text" id="number-of-people" placeholder="0" value={numberOfPeople} onChange={(e) => handlePeopleInput(e.target.value)} className={`w-full h-full border-none text-right py-2 pr-4 ${peopleError ? "outline-[#FF5252]" : "outline-[#26C2AD]"}`} />
            </div>
          </div>          
        </section>

        {/* Tip amount & total per person section */}
        <section className="flex flex-col gap-10 w-full bg-[#00474B] rounded-2xl p-5 md:p-10"> 
          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col"><p className="text-white font-bold">Tip Amount</p> <p className="text-gray-400 text-sm">/ person</p></div> 
            <p className="text-4xl md:text-5xl text-[#26C2AD] font-extrabold">${tipAmount.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col"><p className="text-white">Total</p> <p className="text-gray-400 text-sm">/ person</p></div>
            <p className="text-4xl md:text-5xl text-[#26C2AD] font-extrabold">${totalPerPerson.toFixed(2)}</p>
          </div>
         <button type="button" onClick={reset} className={`w-full mt-0 md:mt-25 font-extrabold text-xl uppercase text-center bg-[#26C2AD] text-[#00474B] rounded-lg py-3 ${(bill === "" && numberOfPeople === "" && tipPercentage === "") ? "opacity-50 cursor-not-allowed" : "hover:bg-[#9FE8DF] hover:cursor-pointer"}`} disabled={bill === "" && numberOfPeople === "" && tipPercentage === ""} >
           Reset 
         </button>
        </section>
      </section>  
    </main>
  )
}

export default App

