import { stateTaxRates } from "../constants/stateTaxRates";

// Income Tax Calculators - assumes W2 employee/single filer/standard deductions
export const getMedicare = (income) => {
  const rate = .0145;
  const returnRate = 1.45;
  const excessRate = .0235;
  const returnExcess = 2.35;
  const excessLimit = 200000;
  const maxUnderExcess = 2900;


  if (income > excessLimit) {
    const overage = income - excessLimit;
    const totalMedicare = (overage * excessRate) + maxUnderExcess;
    return [parseFloat((totalMedicare).toFixed(2)), returnExcess];
  } else if (income > 0) {
    return [parseFloat((income * rate).toFixed(2)), returnRate];
  } else {
    return [0, 0];
  }
}

export const getSocialSecurity = (income) => {
  const rate = .062;
  const returnRate = 6.2;
  const taxableLimit = 147000;
  const max = 9114;

  if (income >= taxableLimit) {
    return [max, returnRate];
  } else if (income > 0){
    return [parseFloat((income * rate).toFixed(2)), returnRate];
  } else {
    return [0, 0];
  }
}

export const getFedTax = (income) => {
  // tax rate: income level
  const fedTaxRates = {
    .37: 539900, .35: 215950, .32: 170050, .24: 89075, .22: 41775, .12: 10275, .1: 0
  }

  const getRate = (income) => {
    return Object.keys(fedTaxRates)
      .find(incomeLevel => fedTaxRates[incomeLevel] < income);
  }

  const getBracket = (income) => {
    return Object.values(fedTaxRates)
      .find(bracket => bracket < income);
  }

  const standardDeduction = 12950;
  const initialAGI = income - standardDeduction;
  const initialRate = parseFloat((getRate(initialAGI) * 100).toFixed(2));
  let AGI = initialAGI;
  let tax = 0;
  
  if (AGI > 0) {
    while (AGI > 0) {
      let rate = getRate(AGI);
      let bracketAmount = getBracket(AGI);
      let taxableIncome = AGI - bracketAmount;
      tax += parseFloat(rate * taxableIncome);
      AGI -= taxableIncome;
    }
    return [parseFloat(tax.toFixed(2)), initialRate, initialAGI, standardDeduction];
  } else {
    return [0, 0, 0, 0];
  }
}

export const getStateTax = (state, income) => {
  
  const checkState = (state) => {
    return Object.keys(stateTaxRates)
      .includes(state);
  }

  const checkDeduction = (state) => {
    return Object.keys(stateTaxRates[state])
      .includes('deduction');
  }

  const getDeduction = (state) => {
    return Object.keys(stateTaxRates[state]['deduction'])
      .find(incomeLevel => stateTaxRates[state]['deduction'][incomeLevel] < income);
  }

  const getRate = (state, AGI) => {
    return Object.keys(stateTaxRates[state])
      .find(incomeLevel => stateTaxRates[state][incomeLevel] < AGI);
  }

  const getBracket = (state, AGI) => {
    return Object.values(stateTaxRates[state])
      .find(bracket => bracket < AGI);
  }

  const getTaxDC = (AGI) => {
    const milli = 1000000;
    const milliFlat = 91525;
    const milliRate = .1075;
    const fiveHund = 500000;
    const fiveFlat = 42775;
    const fiveRate = .0975;
    const twoFifty = 250000;
    const twoFlat = 19560;
    const twoRate = .0925;

    const getTax = (AGI, incomeLevel, rate, flat) => {
      const returnRate = parseFloat((rate * 100).toFixed(2));
      const totalTax = ((AGI - incomeLevel) * rate) + flat;
      return [parseFloat(totalTax.toFixed(2)), returnRate, AGI];
    }

    if (AGI > milli) {
      return getTax(AGI, milli, milliRate, milliFlat)
    } else if (AGI > fiveHund) {
      return getTax(AGI, fiveHund, fiveRate, fiveFlat);
    } else {
      return getTax(AGI, twoFifty, twoRate, twoFlat);
    }
  }

  const stateCheck = checkState(state);
  const deductionCheck = stateCheck && checkDeduction(state);
  const standardDeduction = deductionCheck && getDeduction(state);
  const returnDeduction = standardDeduction ? Math.round(standardDeduction) : 0;
  const initialAGI = income - standardDeduction;
  const marginalRate = stateCheck && parseFloat((getRate(state, initialAGI) * 100).toFixed(2));
  let tax = 0;
  let AGI = initialAGI;
  let rate = stateCheck && getRate(state, AGI);
  
  
  if (state === 'DC' && AGI > 250000) {
    return getTaxDC(AGI);
  } else if (rate) {
    while (rate) {
      let bracketAmount = getBracket(state, AGI);
      let taxableIncome = AGI - bracketAmount;
      tax += parseFloat(rate * taxableIncome);
      AGI -= taxableIncome;
      rate = getRate(state, AGI);
    }
    return [parseFloat(tax.toFixed(2)), marginalRate, initialAGI, returnDeduction];
  } else {
    return [0, 0, 0, 0];
  }
}