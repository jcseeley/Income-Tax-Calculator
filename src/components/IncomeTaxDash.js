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
  const [totalMarginal, setTotalMarginal] = useState(0);

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
      const totalMarginalVal = parseFloat((medMarginalVal + socialMarginalVal + fedMarginalVal + stateMarginalVal).toFixed(2))
      const netVal = Math.round(income - totalVal);
      return setValues(income, state, medVal, medMarginalVal, medEffectiveVal, socialVal, socialMarginalVal, socialEffectiveVal, fedVal, fedMarginalVal, fedAGIVal, fedDeduct, fedEffectiveVal, stateVal, totalVal, stateMarginalVal, stateAGI, stateDeduct, stateEffectiveVal, totalEffectiveVal, totalMarginalVal, netVal);
    } else {
      return;
    }
  }

  const setValues = (income, state, medVal, medMarginalVal, medEffectiveVal, socialVal, socialMarginalVal, socialEffectiveVal, fedVal, fedMarginalVal, fedAGIVal, fedDeduct, fedEffectiveVal, stateVal, totalVal, stateMarginalVal, stateAGI, stateDeduct, stateEffectiveVal, totalEffectiveVal, totalMarginalVal, netVal) => {
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
    setTotalMarginal(totalMarginalVal);
    setNet(netVal);
  }

  return (
    <React.Fragment>
      <div className="flex grid justify-center font-bold mt-2">
        {/* Header */}
        <h1 className="text-center text-4xl italic font-bold mb-2">Income Tax Calculator</h1>
        {/* Form Start */}
        <form id="form" className="grid flex-1 justify-self-center pt-1 px-4 pb-2 w-full" onSubmit={handleFormSubmission}>
          {/* Input Div */}
          <div className="justify-self-center">
            <label className="input-group input-group-sm mb-2">
              <span className="w-full">Annual Income</span>
              <input className="input input-bordered input-sm text-center"
                type='number'
                step='.01'
                name='income'
                placeholder='$USD' />
            </label>
            <label className="input-group input-group-sm text-center mb-2">
              <span className="w-full">State</span>
              <input className="input input-bordered input-sm text-center"
                type='string'
                name='state'
                placeholder='Abbreviation' />
            </label>
          </div>
          <p className="text-center text-xs italic">Enter "DC" for Washington, DC</p>
          <button className="btn btn-sm justify-self-center font-bold mt-2" type='submit' onClick={() => clearValues()}>Submit Form</button>
          {/* Info */}
          <p className="text-center text-sm italic text-red-500 mt-2">*Effective - actual tax rate paid*</p>
          <p className="text-center text-sm italic text-orange-500 mt-1">*Marginal - tax rate paid on any additional income*</p>
          <p className="text-center text-sm italic mt-1 mb-1">*Assumes single file, W2 employee with standard deductions*</p>
        </form>
        {/* Table Start */}
        <table className="table table-compact flex-1 w-3/4 justify-self-center ml-2 mr-2 mb-4">
          <thead>
            <tr className="active">
              <th className="w-1/5">Value</th>
              <th className="text-right">Amount</th>
              <th className="text-center text-red-500">Effective Rate</th>
              <th className="text-center text-orange-500">Marginal Rate</th>
            </tr>
          </thead>
          <tbody>
            {/* Gross Income */}
            <tr className="hover">
              <td className="text-yellow-500">Gross Income</td>
              <td className="text-right text-yellow-500">${gross.toLocaleString("en-US")}</td>
              <td></td>
              <td></td>
            </tr>
            {/* Total Tax */}
            <tr className="hover">
              <td className="text-red-500">Total Tax</td>
              <td className="text-red-500 text-right">-${totalTax.toLocaleString("en-US")}</td>
              <td className="text-red-500 text-center">{totalEffective}%</td>
              <td className="text-center text-orange-500">{totalMarginal}%</td>
            </tr>
            {/* Net Income */}
            <tr className="hover">
              <td className="text-green-500">Net Income</td>
              <td className="text-green-500 text-right">${net.toLocaleString("en-US")}</td>
              <td></td>
              <td></td>
            </tr>
            {/* Blank - Federal Breakdown */}
            <tr className="active">
              <td className="text-sm">Federal Breakdown</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* Federal Deduction */}
            <tr className="hover">
              <td className="text-blue-500">Federal Deduction</td>
              <td className="text-right text-blue-500">${fedDeduction.toLocaleString("en-US")}</td>
              <td></td>
              <td></td>
            </tr>
            {/* Federal AGI */}
            <tr className="hover">
              <td className="text-blue-500">Federal AGI</td>
              <td className="text-right text-blue-500">${AGI.toLocaleString("en-US")}</td>
              <td></td>
              <td></td>
            </tr>
            {/* Federal Tax */}
            <tr className="hover">
              <td className="text-red-500">Federal Tax</td>
              <td className="text-right text-red-500">-${fedTax.toLocaleString("en-US")}</td>
              <td className="text-center text-red-500">{fedEffective}%</td>
              <td className="text-center text-orange-500">{fedMarginal}%</td>
            </tr>
            {/* Social Security */}
            <tr className="hover">
              <td className="text-red-500">Social Security</td>
              <td className="text-right text-red-500">-${social.toLocaleString("en-US")}</td>
              <td className="text-center text-red-500">{socialEffective}%</td>
              <td className="text-center text-orange-500">{socialMarginal}%</td>
            </tr>
            {/* Medicare */}
            <tr className="hover">
              <td className="text-red-500">Medicare</td>
              <td className="text-right text-red-500">-${medicare.toLocaleString("en-US")}</td>
              <td className="text-center text-red-500">{medEffective}%</td>
              <td className="text-center text-orange-500">{medMarginal}%</td>
            </tr>
            {/* Blank - Federal Breakdown */}
            <tr className="active">
              <td className="text-sm">State Breakdown</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {/* State Deduction */}
            <tr className="hover">
              <td className="text-lime-500"><span>{state}</span> State Deduction</td>
              <td className="text-right text-lime-500">${stateDeduction.toLocaleString("en-US")}</td>
              <td></td>
              <td></td>
            </tr>
            {/* State AGI */}
            <tr className="hover">
              <td className="text-lime-500"><span>{state}</span> State AGI</td>
              <td className="text-right text-lime-500">${stateAGI.toLocaleString("en-US")}</td>
              <td></td>
              <td></td>
            </tr>
            {/* State Tax */}
            <tr className="hover">
              <td className="text-red-500"><span>{state}</span> State Tax</td>
              <td className="text-right text-red-500">-${stateTax.toLocaleString("en-US")}</td>
              <td className="text-center text-red-500">{stateEffective}%</td>
              <td className="text-center text-orange-500">{stateMarginal}%</td>
            </tr>
          </tbody>
        </table>
        
      </div>
    </React.Fragment>
  );
}

export default IncomeTaxDash;