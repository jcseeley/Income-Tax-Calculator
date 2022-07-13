import React, { useState } from "react";
import { getMedicare, getSocialSecurity, getFedTax, getStateTax } from "../functions/IncomeTaxCalculators";

const IncomeTaxDash = () => {
  const [gross, setGross] = useState(0);
  const [state, setState] = useState('');
  const [AGI, setAGI] = useState(0);
  const [stateAGI, setStateAGI] = useState(0);
  const [medicare, setMedicare] = useState(0);
  const [medEffective, setMedEffective] = useState(0);
  const [medMarginal, setMedMarginal] = useState(0);
  const [social, setSocial] = useState(0);
  const [socialEffective, setSocialEffective] = useState(0);
  const [socialMarginal, setSocialMarginal] = useState(0);
  const [fedTax, setFedTax] = useState(0);
  const [fedDeduction, setFedDeduction] = useState(0);
  const [stateTax, setStateTax] = useState(0);
  const [stateDeduction, setStateDeduction] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [net, setNet] = useState(0);
  const [fedMarginal, setFedMarginal] = useState(0);
  const [stateMarginal, setStateMarginal] = useState(0);
  const [fedEffective, setFedEffective] =  useState(0);
  const [stateEffective, setStateEffective] = useState(0);
  const [totalEffective, setTotalEffective] = useState(0);

  function clearValues() {
    setGross(0);
    setState('');
    setAGI(0);
    setStateAGI(0);
    setMedicare(0);
    setMedEffective(0);
    setMedMarginal(0);
    setSocial(0);
    setSocialEffective(0);
    setSocialMarginal(0);
    setFedTax(0);
    setFedDeduction(0);
    setStateTax(0);
    setStateDeduction(0);
    setTotalTax(0);
    setFedMarginal(0);
    setStateMarginal(0);
    setFedEffective(0);
    setStateEffective(0);
    setTotalEffective(0);
    setNet(0);
  }

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const income = event.target.income.value;
    const state = event.target.state.value.toUpperCase();
    getValues(income, state);
  }

  const getValues = (income, state) => {
    if (income > 0 && state.length === 2) {
      const medValArr = getMedicare(income);
      const medVal = Math.round(medValArr[0]);
      const medMarginalVal = medValArr[1];
      const medEffectiveVal = parseFloat(((medVal / income) * 100).toFixed(2));
      const socialValArr = getSocialSecurity(income);
      const socialVal = Math.round(socialValArr[0]);
      const socialMarginalVal = socialValArr[1];
      const socialEffectiveVal = parseFloat(((socialVal / income) * 100).toFixed(2));
      const fedValArr = getFedTax(income);
      const fedVal = Math.round(fedValArr[0]);
      const fedMarginalVal = fedValArr[1];
      const fedAGIVal = Math.round(fedValArr[2]);
      const fedDeduct = fedValArr[3];
      const fedEffectiveVal = parseFloat(((fedVal / income) * 100).toFixed(2));
      const stateValArr = getStateTax(state, income);
      const stateVal = Math.round(stateValArr[0]);
      const totalVal = Math.round(medVal + socialVal + fedVal + stateVal);
      const stateMarginalVal = stateValArr[1];
      const stateAGI = stateValArr[2];
      const stateDeduct = stateValArr[3];
      const stateEffectiveVal = parseFloat(((stateVal / income) * 100).toFixed(2));
      const totalEffectiveVal = parseFloat(((totalVal / income) * 100).toFixed(2));
      const netVal = Math.round(income - totalVal);
      return setValues(income, state, medVal, medMarginalVal, medEffectiveVal, socialVal, socialMarginalVal, socialEffectiveVal, fedVal, fedMarginalVal, fedAGIVal, fedDeduct, fedEffectiveVal, stateVal, totalVal, stateMarginalVal, stateAGI, stateDeduct, stateEffectiveVal, totalEffectiveVal, netVal);
    } else {
      return;
    }
  }

  const setValues = (income, state, medVal, medMarginalVal, medEffectiveVal, socialVal, socialMarginalVal, socialEffectiveVal, fedVal, fedMarginalVal, fedAGIVal, fedDeduct, fedEffectiveVal, stateVal, totalVal, stateMarginalVal, stateAGI, stateDeduct, stateEffectiveVal, totalEffectiveVal, netIncome) => {
    setGross(Math.round(income));
    setState(state);
    setMedicare(medVal);
    setMedMarginal(medMarginalVal);
    setMedEffective(medEffectiveVal);
    setSocial(socialVal);
    setSocialMarginal(socialMarginalVal);
    setSocialEffective(socialEffectiveVal);
    setFedTax(fedVal);
    setFedMarginal(fedMarginalVal);
    setAGI(fedAGIVal);
    setFedDeduction(fedDeduct);
    setFedEffective(fedEffectiveVal);
    setStateTax(stateVal);
    setTotalTax(totalVal);
    setStateMarginal(stateMarginalVal);
    setStateAGI(stateAGI);
    setStateDeduction(stateDeduct);
    setStateEffective(stateEffectiveVal);
    setTotalEffective(totalEffectiveVal);
    setNet(netIncome);
  }

  return (
    <React.Fragment>
      <div className="flex justify-center">
        <div className="rounded overflow-hidden shadow-lg mb-2 mt-4">
          <h1 className="text-center text-3xl font-bold">Income Tax Calculator</h1>
          <form id="form" className="bg-white rounded px-8 pt-6 pb-4" onSubmit={handleFormSubmission}>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-center leading-tight focus:outline-none focus:shadow-outline mb-2"
              type='float'
              name='income'
              placeholder='Annual Income' />
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-center leading-tight focus:outline-none focus:shadow-outline mb-2"
              type='string'
              name='state'
              placeholder='State Abbreviation' />
              <p className="text-center text-sm italic">*Enter "DC" for Washington, DC*</p>
            <div className="flex justify-center">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2" type='submit' onClick={() => clearValues()}>Get Tax Breakdown</button>
            </div>
          </form>
          <hr />
          <div className="grid grid-cols-4 mt-2 ml-2 mr-2 mb-2">
            <div className="text-left ml-2 mb-2">
              <h1 className="underline">Income</h1>
              <hr className="border-white"/>
              <h1>Gross:</h1>
              <hr />
              <h1 className="text-red-600">Total Tax:</h1>
              <hr />
              <h1 className="text-green-700">Net:</h1>
              <hr />
              <br />
              <h1 className="underline">Tax Breakdown</h1>
              <h1>Federal Deduction:</h1>
              <hr />
              <h1>Federal AGI:</h1>
              <hr />
              <h1>Federal Tax:</h1>
              <hr />
              <h1>Social Security:</h1>
              <hr />
              <h1>Medicare:</h1>
              <hr />
              <h1><span>{state}</span> State Deduction:</h1>
              <hr />
              <h1><span>{state}</span> State AGI:</h1>
              <hr />
              <h1><span>{state}</span> State Tax:</h1>
              <hr />
            </div>
            <div className="text-right mb-2">
              <br />
              <hr className="border-white"/>
              <h1>${gross.toLocaleString("en-US")}</h1>
              <hr />
              <h1 className="text-red-600">-${totalTax.toLocaleString("en-US")}</h1>
              <hr />
              <h1 className="text-green-700"><span>${net.toLocaleString("en-US")}</span></h1>
              <hr />
              <br />
              <br />
              <h1 className="text-blue-600">${fedDeduction.toLocaleString("en-US")}</h1>
              <hr />
              <h1 className="text-blue-600">${AGI.toLocaleString("en-US")}</h1>
              <hr />
              <h1><span className="text-orange-800">-${fedTax.toLocaleString("en-US")}</span></h1>
              <hr />
              <h1><span className="text-orange-800">-${social.toLocaleString("en-US")}</span></h1>
              <hr />
              <h1><span className="text-orange-800">-${medicare.toLocaleString("en-US")}</span></h1>
              <hr />
              <h1><span className="text-blue-600">${stateDeduction.toLocaleString("en-US")}</span></h1>
              <hr />
              <h1><span className="text-blue-600">${stateAGI.toLocaleString("en-US")}</span></h1>
              <hr />
              <h1><span className="text-orange-800">-${stateTax.toLocaleString("en-US")}</span></h1>
              <hr />
            </div>
            <div className="text-center mb-2">
              <h1 className="underline ml-2 mr-2">Effective Tax Rate:</h1>
              <hr className="border-white"/>
              <br />
              <hr className="border-white"/>
              <h1 className="text-red-600"><span>{totalEffective}</span>%</h1>
              <hr />
              <br />
              <hr className="border-white"/>
              <br />
              <br />
              <br />
              <hr className="border-white"/>
              <br />
              <hr className="border-white"/>
              <h1 className="text-orange-800"><span>{fedEffective}</span>%</h1>
              <hr />
              <h1 className="text-orange-800"><span>{socialEffective}</span>%</h1>
              <hr />
              <h1 className="text-orange-800"><span>{medEffective}</span>%</h1>
              <hr />
              <br />
              <hr className="border-white"/>
              <br />
              <hr className="border-white"/>
              <h1 className="text-orange-800"><span>{stateEffective}</span>%</h1>
              <hr />
            </div>
            <div className="text-center mr-2">
              <h1 className="underline">Marginal Tax Rate:</h1>
              <hr className="border-white"/>
              <br />
              <hr className="border-white"/>
              <h1>N/A</h1>
              <hr />
              <br />
              <hr className="border-white"/>
              <br />
              <br />
              <br />
              <hr className="border-white"/>
              <br />
              <hr className="border-white"/>
              <h1><span>{fedMarginal}</span>%</h1>
              <hr />
              <h1><span>{socialMarginal}</span>%</h1>
              <hr />
              <h1><span>{medMarginal}</span>%</h1>
              <hr />
              <br />
              <hr className="border-white"/>
              <br />
              <hr className="border-white"/>
              <h1><span>{stateMarginal}</span>%</h1>
              <hr />
            </div>
          </div>
          <p className="text-center text-sm italic mb-4">* assumes single file, W2 employee with standard deductions *</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default IncomeTaxDash;