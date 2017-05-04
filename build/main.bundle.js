'use strict';

var calculateMonthlyPayment = function calculateMonthlyPayment(principal, years, rate) {
  var monthlyRate = 0;
  if (rate) {
    monthlyRate = rate / 100 / 12;
  }
  var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
  return { principal: principal, years: years, rate: rate, monthlyPayment: monthlyPayment, monthlyRate: monthlyRate };
};

var calcutateAmortization = function calcutateAmortization(principal, years, rate) {
  var _calculateMonthlyPaym = calculateMonthlyPayment(principal, years, rate),
      monthlyRate = _calculateMonthlyPaym.monthlyRate,
      monthlyPayment = _calculateMonthlyPaym.monthlyPayment;

  var balance = principal;
  var amortization = [];
  for (var y = 0; y < years; y++) {
    var interestY = 0;
    var principalY = 0;
    for (var m = 0; m < 12; m++) {
      var interestM = balance * monthlyRate;
      var principalM = monthlyPayment - interestM;
      interestY = interestY + interestM;
      principalY = principalY + principalM;
      balance = balance - principalM;
    }
    amortization.push({ principalY: principalY, interestY: interestY, balance: balance });
  }
  return { monthlyPayment: monthlyPayment, monthlyRate: monthlyRate, amortization: amortization };
};

document.getElementById('calcBtn').addEventListener('click', function () {
  var principal = document.getElementById("principal").value;
  var years = document.getElementById("years").value;
  var rate = document.getElementById("rate").value;

  var _calcutateAmortizatio = calcutateAmortization(principal, years, rate),
      monthlyPayment = _calcutateAmortizatio.monthlyPayment,
      monthlyRate = _calcutateAmortizatio.monthlyRate,
      amortization = _calcutateAmortizatio.amortization;

  document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
  document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
  amortization.forEach(function (month) {
    return console.log(month);
  });
});
