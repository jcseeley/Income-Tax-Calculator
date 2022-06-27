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
  // state abbreviation: {tax rate: income level, deduction: {amount: income level}}
  const stateTaxRates = {
    AL: {
      .05: 3000, .04: 500, .02: 0,
      deduction: {2500: 0}
    },
    AZ: {
      .045: 166843, .0417: 55615, .0334: 27808, .0259: 0,
      deduction: {12950: 0}
    },
    AR: {
      .055: 8500, .04: 4300, .02: 0, 
      deduction: {2200: 0}
    },
    CA: {
      .133: 1000000, .123: 625369, .113: 375221, .103: 312686, .093: 61214, .08: 48435, .06: 34892, .04: 22107, .02: 9325, .01: 0,
      deduction: {4803: 0}
    },
    CO: {
      .0455: 0,
      deduction: {12950: 0}
    },
    CT: {
      .0699: 500000, .069: 250000, .065: 200000, .06: 100000, .055: 50000, .05: 10000, .03: 0
    },
    DE: {
      .066: 60000, .0555: 25000, .052: 20000, .048: 10000, .039: 5000, 0.22: 2000,
      deduction: {3250: 2000}
    },
    GA: {
      .0575: 7000, .05: 5250, .04: 3750, .03: 2250, .02: 750, .01: 0,
      deduction: {5400: 750, 4600: 0}
    },
    HI: {
      .11: 200000, .1: 175000, .09: 150000, .0825: 48000, .079: 36000, .076: 24000, .072: 19200, .068: 14400, .064: 9600, .055: 4800, .032: 2400, .014: 0,
      deduction: {2200: 0}
    },
    ID: {
      .06: 7939, .045: 4763, .03: 1588, .01: 0,
      deduction: {12950: 0}
    },
    IL: {
      .0495: 0
    },
    IN: {
      .0323: 0
    },
    IA: {
      .0853: 78435, .0744: 52290, .0625: 34860, .0596: 26145, .0563: 15687, .0414: 6972, .0225: 3486, .0067: 1743, .0033: 0,
      deduction: {2210: 0}
    },
    KS: {
      .057: 30000, .0525: 15000, .031: 0,
      deduction: {3500: 0}
    },
    KY: {
      .05: 0,
      deduction: {2770: 0}
    },
    LA: {
      .0425: 50000, .035: 12500, .0185: 0
    },
    ME: {
      .0715: 54450, .0675: 23000, .058: 0,
      deduction: {12950: 0}
    },
    MD: {
      .0575: 250000, .055: 150000, .0525: 125000, .05: 100000, .0475: 3000, .04: 2000, .03: 1000, .02: 0,
      deduction: {2350: 0}
    },
    MA: {
      .05: 0
    },
    MI: {
      .0425: 0,
      deduction: {12900: 0}
    },
    MN: {
      .0985: 171220, .0785: 92230, .068: 28080, .0535: 0
    },
    MS: {
      .05: 10000, .04: 5000,
      deduction: {2300: 5000}
    },
    MO: {
      .054: 8704, .05: 7616, .045: 6528, .04: 5440, .035: 4352, .03: 3264, .025: 2176, .02: 1088, .015: 108,
      deduction: {12950: 108}
    },
    MT: {
      .0675: 18800, .06: 14600, .05: 11400, .04: 8400, .03: 5500, .02: 3100, .01: 0,
      deduction: {4830: 0}
    },
    NE: {
      .0684: 33180, .0501: 20590, .0351: 3440, .0246: 0,
      deduction: {7350: 0}
    },
    NJ: {
      .1075: 1000000, .0897: 500000, .0637: 75000, .05525: 40000, .035: 35000, .0175: 20000, .014: 0
    },
    NM: {
      .059: 210000, .049: 16000, .047: 11000, .032: 5500, .017: 0,
      deduction: {12950: 0}
    },
    NY: {
      .109: 25000000, .103: 5000000, .0965: 1077550, .0685: 215400, .0625: 80650, .0585: 13900, .0525: 11700, .045: 8500, .04: 0,
      deduction: {8000: 0}
    },
    NC: {
      .0499: 0,
      deduction: {12750: 0}
    },
    ND: {
      .029: 445000, .0264: 204675, .0227: 98100, .0204: 40525, .011: 0,
      deduction: {12950: 0}
    },
    OH: {
      .0399: 110650, .03688: 88450, .03226: 44250, .02765: 25000
    },
    OK: {
      .0475: 7200, .0375: 4900, .0275: 3750, .0175: 2500, .0075: 1000, .0025: 0,
      deduction: {6350: 0}
    },
    OR: {
      .099: 125000, .0875: 9200, .0675: 3650, .0475: 0,
      deduction: {2420: 0}
    },
    PA: {
      .0307: 0
    },
    RI: {
      .0599: 155050, .0475: 68200, .0375: 0,
      deduction: {9300: 0}
    },
    SC: {
      .07: 16040, .06: 12820, .05: 9620, .04: 6410, .03: 3200,
      deduction: {12950: 0}
    },
    UT: {
      .0495: 0
    },
    VT: {
      .0875: 206950, .076: 99200, .066: 40950, .0335: 0,
      deduction: {6350: 0}
    },
    VA: {
      .0575: 17000, .05: 5000, .03: 3000, .02: 0,
      deduction: {4500: 0}
    },
    WV: {
      .065: 60000, .06: 40000, .045: 25000, .04: 10000, .03: 0
    },
    WI: {
      .0765: 280950, .053: 25520, .0465: 12760, .0354: 0,
      deduction: {11790: 0}
    },
    DC: {
      .1075: 1000000, .0975: 500000, .0925: 250000, .085: 60000, .065: 40000, .06: 10000, .04: 0,
      deduction: {12950: 0}
    }
  }

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
  const initialAGI = income -= standardDeduction;
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