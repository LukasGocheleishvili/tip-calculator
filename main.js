// Get HTML elements
const priceInput = document.querySelector(".price");
const tipButtons = document.querySelectorAll(".btn");
const customInput = document.querySelector(".custom");
const peopleInput = document.querySelector(".ppl");
const tipAmountOutput = document.getElementById("tipAmount");
const totalOutput = document.getElementById("tipAmountt");
const resetButton = document.querySelector(".reset");

function calculateTipAndTotal() {
  const price = parseFloat(priceInput.value);
  const tipPercentage = getTipPercentage();
  const numberOfPeople = parseInt(peopleInput.value);

  if (price > 0 && tipPercentage > 0 && numberOfPeople > 0) {
    const tipAmount = (price * tipPercentage) / numberOfPeople;
    tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;

    const totalPerPerson = (price + price * tipPercentage) / numberOfPeople;
    totalOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    tipAmountOutput.textContent = "$0.00";
    totalOutput.textContent = "$0.00";
  }
}

function getTipPercentage() {
  const selectedButton = document.querySelector(".btn.selected");
  if (selectedButton) {
    return parseFloat(selectedButton.value) / 100;
  } else if (customInput.value !== "") {
    return parseFloat(customInput.value) / 100;
  } else {
    return 0;
  }
}

function updateSelectedButton() {
  tipButtons.forEach((button) => {
    button.classList.remove("selected");
  });

  const customValue = parseFloat(customInput.value);
  if (customValue !== "") {
    customInput.value = customValue.toFixed(0);
  }

  if (customValue === getTipPercentage() * 100) {
    customInput.classList.add("selected");
  }
}

function reset() {
  priceInput.value = "";
  tipButtons.forEach((button) => {
    button.classList.remove("selected");
  });
  customInput.value = "";
  peopleInput.value = "";
  tipAmountOutput.textContent = "$0.00";
  totalOutput.textContent = "$0.00";
}

priceInput.addEventListener("input", calculateTipAndTotal);
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("selected");
    customInput.value = "";
    calculateTipAndTotal();
  });
});
customInput.addEventListener("input", () => {
  updateSelectedButton();
  calculateTipAndTotal();
});
peopleInput.addEventListener("input", calculateTipAndTotal);
resetButton.addEventListener("click", reset);
