const moneyCounter = document.getElementById('money-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]') .length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Enter ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-Amount">Enter ${entryNumber} Amount</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-amount"
    placeholder="Amount"
  />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

function calculateMoney(e) {
  e.preventDefault();
  isError = false;

  const accessoriesNumberInputs = document.querySelectorAll('#accessories input[type=number]');
  const televsionNumberInputs = document.querySelectorAll('#television input[type=number]');
  const dataNumberInputs = document.querySelectorAll('#data input[type=number]');
  const cosmeticsNumberInputs = document.querySelectorAll('#cosmetics input[type=number]');
  const booksNumberInputs = document.querySelectorAll('#books input[type=number]');

  const accessoriesmoney = getMoneyFromInputs(accessoriesNumberInputs);
  const televisionmoney = getMoneyFromInputs(televsionNumberInputs);
  const datamoney = getMoneyFromInputs(dataNumberInputs);
  const cosmeticsmoney = getMoneyFromInputs(cosmeticsNumberInputs);
  const booksmoney = getMoneyFromInputs(booksNumberInputs);
  const budgetmoney = getMoneyFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedMoney =  accessoriesmoney +  televisionmoney + datamoney + cosmeticsmoney + booksmoney;
  const remainingMoney = budgetmoney - consumedMoney;
  const surplusOrDeficit = remainingMoney >= 0 ? 'Surplus' : 'Deficit';
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingMoney)} Money ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetmoney} Money Budgeted</p>
  <p>${consumedMoney} Money Consumed</p>
  `;

  output.classList.remove('hide');
}

function getMoneyFromInputs(list) {
  let money = 0;

  for (let i = 0; i < list.length; i++) {
    const currVal = cleanInputString(list[i].value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    money += Number(currVal);
  }
  return money;
}

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (let i = 0; i < inputContainers.length; i++) {
    inputContainers[i].innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
moneyCounter.addEventListener("submit", calculateMoney);
  clearButton.addEventListener("click", clearForm);