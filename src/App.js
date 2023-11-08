import { useEffect, useState } from "react";

function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(5);
  const [numberOfMembers, setNumberOfMembers] = useState(1);
  const [total, setTotal] = useState();
  const [tip, settip] = useState();
  const [toggle, setToggle] = useState(false);
  const [val, setVal] = useState(0);

  const percent = [5, 10, 15, 25, 50];
  const calculateShare = () => {
    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalAmount = billAmount + tipAmount;
    const individualShare = totalAmount / numberOfMembers;
    const totaltip = (billAmount * tipPercentage) / 100;
    const tipPercent = totaltip / numberOfMembers;
    settip(tipPercent ? tipPercent.toFixed(2) : tip);
    setTotal(individualShare ? individualShare.toFixed(2) : total);
    if (billAmount < 0 || tipPercentage < 0 || numberOfMembers < 1) {
      setBillAmount(0);
      setTipPercentage(5);
      setNumberOfMembers(1);
      setTotal();
      settip();
    }
  };

  const SelectTip = (item, id) => {
    setTipPercentage(parseFloat(item));
    setVal(id);
  };
  const Reset = () => {
    setBillAmount(0);
    setTipPercentage(5);
    setNumberOfMembers(1);
    settip();
    setTotal();
    setVal(0);
  };
  useEffect(() => {
    calculateShare();
  });

  return (
    <div className="p-6 grid grid-cols-2 gap-8 bg-white rounded-lg box-shadow mt-52 mx-48">
      <div className="space-y-10">
        <div className="flex flex-col">
          <div className="text-[#588157] font-semibold tracking-wide">Bill</div>
          <input
            className="border border-black p-3 rounded-lg outline-none font-bold"
            placeholder="$"
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(parseFloat(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-[#588157] font-semibold tracking-wide">
            Select Tip %
          </label>

          <div className="grid grid-cols-3 gap-5">
            {percent.map((item, index) => {
              return (
                <div key={index} className="">
                  <button
                    onClick={() => SelectTip(item, index)}
                    className={`text-white ${
                      val=== index  ? "bg-[#84a98c]" : "bg-black "
                    } px-6 py-1 font-bold rounded-md`}
                  >
                    {item}%
                  </button>
                </div>
              );
            })}
            <div>
              <button
                className=" bg-[#cad2c5] text-black font-semibold rounded-lg px-3 py-1"
                onClick={() => setToggle(!toggle)}
              >
                Custom
              </button>
            </div>
          </div>
          {toggle && (
            <div className="flex flex-col">
              <label className="text-[#588157] font-semibold tracking-wide">
                Tip Percentage
              </label>
              <input
                className="border border-black p-3 rounded-lg outline-none font-bold"
                type="number"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(parseFloat(e.target.value))}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-[#588157] font-semibold tracking-wide">
            Number of Members
          </label>
          <input
            className="border border-black p-3 rounded-lg outline-none font-bold"
            type="number"
            value={numberOfMembers}
            onChange={(e) => setNumberOfMembers(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div>
        <div className="bg-[#344e41] h-full rounded-xl px-8 py-6">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="text-white font-bold text-base">
              Tip Amount <br />
              <span className="text-sm font-medium text-[#06d6a0]">
                /person
              </span>
            </div>
            <div className="text-[#06d6a0]"> {tip && <div>${tip}</div>}</div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="text-white font-bold text-base ">
              Total <br />
              <span className="text-sm font-medium text-[#06d6a0]">
                /person
              </span>
            </div>
            <div className="text-[#06d6a0]">{total && <div>${total}</div>}</div>
          </div>
          <div className="flex justify-center mt-20 ">
            <button
              className="bg-[#06d6a0] py-3 w-full font-bold"
              onClick={() => Reset()}
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
