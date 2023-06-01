const addButtton = document.querySelector(".add-button");
const addInput = document.querySelector(".add-input");
var operationsDiv = document.querySelector(".operations-div");
var statisticsDiv = document.querySelector(".statistics-div");


document.addEventListener('DOMContentLoaded', getProducts);
const names = [];
let allAvailiableProduct;

function fillWithDefaultValues() {
  for (let i = 0; i < allAvailiableProduct.length; i++) {
    for(const section of allAvailiableProduct[i].children) {
      if(section.className == "left-section") {
        for(const element of section.children) {
          names.push(element.textContent.trim());
        }
        break;
      }
    }  
  }
}

function contains(names, newName) {
  for(const name of names) {
    if(name == newName) {
      return true;
    }
  }
  return false;
}


addButtton.addEventListener("click", addNewProduct);  
addInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    addNewProduct();
    // saveData();
  }
});

function addNewProduct() {
  const getInfoFromInput = document.
  getElementsByClassName("add-input")[0].value;

  if(contains(names, getInfoFromInput)) {
    alert("There is already a product with that name!");
    document.getElementsByClassName("add-input")[0].value = "";
    document.getElementsByClassName("add-input")[0].focus();
    return;
  } else {
    names.push(getInfoFromInput);
  }
  console.log(names);

  if(getInfoFromInput !== "") {
    const newProduct = document.createElement("section");
    newProduct.setAttribute("class", "product-div");
    // left section
    const leftSection = document.createElement("section");
    leftSection.setAttribute("class", "left-section");
      // name of the product
    const productName = document.createElement("label");
    productName.setAttribute("class", "product-name-text");
    productName.setAttribute("for", "name");
    productName.appendChild(document.createTextNode(getInfoFromInput));
    leftSection.appendChild(productName);
    
    // middle section
    const middleSection = document.createElement("section");
    middleSection.setAttribute("class", "middle-section");
      //minus button
    const minusButton = document.createElement("button");
    minusButton.setAttribute("class", "minus-button-disable");
    minusButton.appendChild(document.createTextNode("–"));
    const tooltipMinus = document.createElement("section");
    tooltipMinus.setAttribute("class", "tooltip-div");
    const tooltipMinusText = document.createElement("label");
    tooltipMinusText.setAttribute("data-tooltip", "tooltip");
    tooltipMinusText.setAttribute("for", "tooltip");
    tooltipMinusText.appendChild(document.createTextNode("Зменшити кількість"));
    tooltipMinus.appendChild(tooltipMinusText);
    minusButton.appendChild(tooltipMinus);
      // input
    const amountInput = document.createElement("input");
    amountInput.setAttribute("class", "amount");
    amountInput.setAttribute("type", "text");
    amountInput.setAttribute("value", "1");
    amountInput.setAttribute('readonly', true);
      // plus button
    const plusButton = document.createElement("button");
    plusButton.setAttribute("class", "plus-button");
    plusButton.appendChild(document.createTextNode("+"));
    const tooltipPlus = document.createElement("section");
    tooltipPlus.setAttribute("class", "tooltip-div");
    const tooltipPlusText = document.createElement("label");
    tooltipPlusText.setAttribute("data-tooltip", "tooltip");
    tooltipPlusText.setAttribute("for", "tooltip");
    tooltipPlusText.appendChild(document.createTextNode("Збільшити кількість"));
    tooltipPlus.appendChild(tooltipPlusText);
    plusButton.appendChild(tooltipPlus);    

    middleSection.appendChild(minusButton);
    middleSection.appendChild(amountInput);
    middleSection.appendChild(plusButton);

    // left section
    const rightSection = document.createElement("section");
    rightSection.setAttribute("class", "right-section");
    const buyButton = document.createElement("button");
      //buy button
    buyButton.setAttribute("class", "buy-button");
    buyButton.appendChild(document.createTextNode("Куплено"));
      // cross button
    const crossButton = document.createElement("button");
    crossButton.setAttribute("class", "cross-button");
    crossButton.appendChild(document.createTextNode("\u2716"));
    const tooltipCross = document.createElement("section");
    tooltipCross.setAttribute("class", "tooltip-div");
    const tooltipCrossText = document.createElement("label");
    tooltipCrossText.setAttribute("data-tooltip", "tooltip");
    tooltipCrossText.setAttribute("for", "tooltip");
    tooltipCrossText.appendChild(document.createTextNode("Скасувати"));
    tooltipCross.appendChild(tooltipCrossText);
    crossButton.appendChild(tooltipCross);   

    rightSection.appendChild(buyButton);
    rightSection.appendChild(crossButton);

    newProduct.appendChild(leftSection);
    newProduct.appendChild(middleSection);
    newProduct.appendChild(rightSection);

    document.querySelector(".operations-div").appendChild(newProduct);
    document.getElementsByClassName("add-input")[0].value = "";
    document.getElementsByClassName("add-input")[0].focus();
    newLeftItem(getInfoFromInput, 1);
  }
  saveData();
}

function newLeftItem(name, amount) {
  const productItem = document.createElement("span");
  productItem.setAttribute("class", "product-item");
  productItem.appendChild(
    document.createTextNode(name));
  const amountOfItem = document.createElement("span");
  amountOfItem.setAttribute("class", "amount-statistic");
  amountOfItem.appendChild(
    document.createTextNode(amount)
  );
  productItem.appendChild(amountOfItem);
  document.querySelector(".remaining-div").appendChild(productItem);
  saveData();
}

const allProducts = document.querySelectorAll(".product-div");

for(let i = 0; i < allProducts.length; i++) {
  let nameOfTheProduct;
  let amountOfTheProduct;
  for(const section of allProducts[i].children) {
    for(const element of section.children) {
      if(element.className == "product-name-text") {
        nameOfTheProduct = element.innerText;
      } else if(element.className == "amount") {
        amountOfTheProduct = element.value;
        break;
      }
    }
  }
  newLeftItem(nameOfTheProduct, amountOfTheProduct);
}

function deleteProduct(element) {
  let parent = element.parentNode.parentNode;
  element.parentNode.parentNode.remove();
  deleteLeftItems(parent);
  names.splice(findIndexOfNameToRemove(parent), 1);
  saveData();
}

function findIndexOfNameToRemove(parent) {
  let name;
  for(const section of parent.children) {
    if(section.className == "left-section") {
      for(const element of section.children) {
        name = element.textContent.trim()
      }
      break;
    }
  }
  return findName(name);
}

document.querySelector(".operations-div").
  addEventListener("click", (e) => {
    let element = e.target;
    console.log(element);
    if(element.className == "cross-button") {
      deleteProduct(element);
    } else if(element.className == "plus-button") {
      incrementProductAmount(element);
    } else if(element.className == "minus-button") {
      decreaseProductAmount(element);
    } else if(element.className == "product-name-text") {
      changeNameOfProduct(element);
    } else if(element.className == "buy-button") {
      changeStateToBought(element);
    } else if (element.className == "no-buy-button") {
      changeStateToLeft(element);
    } 
  });

function makeBoughtItem(parent) {
  let nameOfTheProduct;
  let amountOfTheProduct;
  for(const section of parent.children) {
    for(const element of section.children) {
      if(element.className == "product-name-slesh") {
        nameOfTheProduct = element.innerText.trim();
      } else if (element.className == "amount") {
        amountOfTheProduct = element.value;
        break;
      }
    }
  }
  let remainDiv = document.querySelector(".remaining-div");
  for(const element of remainDiv.children) {
    if(element.firstChild.textContent == nameOfTheProduct) {
      element.remove();
    }
  }
  let soldDiv = document.querySelector(".sold-div");
  const item = document.createElement("span");
  item.setAttribute("class", "product-item-slesh");
  item.appendChild(
  document.createTextNode(nameOfTheProduct)
  );
  const amountOfItem = document.createElement("span");
  amountOfItem.setAttribute("class", "amount-statistic-slesh");
  amountOfItem.appendChild(
  document.createTextNode(amountOfTheProduct)
  );
  item.appendChild(amountOfItem);
  soldDiv.appendChild(item);
  saveData();
}

function deleteLeftItems(parent) {
  let nameOfTheProduct;
  for(const section of parent.children) {
    for(const element of section.children) {
      if(element.className == "product-name-text") {
        nameOfTheProduct = element.innerText.trim();
        break;
      }
    }
  }
  let remainDiv = document.querySelector(".remaining-div");
  for(const element of remainDiv.children) {
    if(element.firstChild.textContent == nameOfTheProduct) {
      element.remove();
    }
  }
  saveData();
}  

function changeLeftItems(parent, oldName) {
  let nameOfTheProduct;
  let amountOfTheProduct;
  for(const section of parent.children) {
    for(const element of section.children) {
      if(element.className == "product-name-text") {
        nameOfTheProduct = element.innerText;
      } else if(element.className == "amount") {
        amountOfTheProduct = element.value;
        break;
      }
    }
  }
  let remainDiv = document.querySelector(".remaining-div");
  for(const element of remainDiv.children) {
    if(element.firstChild.textContent == oldName) {
      element.firstChild.textContent = nameOfTheProduct;
      element.lastChild.remove();
      const amountOfItem = document.createElement("span");
      amountOfItem.setAttribute("class", "amount-statistic");
      amountOfItem.appendChild(
      document.createTextNode(amountOfTheProduct)
      );
      element.appendChild(amountOfItem);
    }
  }
} 

function changeStateToLeft(element) {
  let parent = element.parentNode;
  element.remove();
  returnProductToLeft(parent.parentNode);
    //buy button
  const buyButton = document.createElement("button");
  buyButton.setAttribute("class", "buy-button");
  buyButton.appendChild(document.createTextNode("Куплено"));
    // cross button
  const crossButton = document.createElement("button");
  crossButton.setAttribute("class", "cross-button");
  crossButton.appendChild(document.createTextNode("\u2716"));
  const tooltipCross = document.createElement("section");
  tooltipCross.setAttribute("class", "tooltip-div");
  const tooltipCrossText = document.createElement("label");
  tooltipCrossText.setAttribute("data-tooltip", "tooltip");
  tooltipCrossText.setAttribute("for", "tooltip");
  tooltipCrossText.appendChild(document.createTextNode("Скасувати"));
  tooltipCross.appendChild(tooltipCrossText);
  crossButton.appendChild(tooltipCross);
  parent.appendChild(buyButton);
  parent.appendChild(crossButton);
  addButtonsAndText(parent);
  saveData();
}

function returnProductToLeft(parent) {
  let productName;
  let productAmount;
  for(const section of parent.children) {
    for(const element of section.children) {
      if(element.className == "product-name-slesh") {
        productName = element.innerHTML.trim();
      } else if(element.className == "amount") {
        productAmount = element.value;
      }
    }
  }
  let soldDiv = document.querySelector(".sold-div");
  let name;
  let amount;
  for(const element of soldDiv.children) {
    name = element.firstChild.textContent.trim();
    if(productName == name) {
      for(const inside of element.children) {
        amount = parseInt(inside.textContent.trim());
        if(amount == productAmount) {
          break;
        }
      }
      element.remove();
      break;
    }
  }
  let remainDiv = document.querySelector(".remaining-div");
  const productItem = document.createElement("span");
  productItem.setAttribute("class", "product-item");
  productItem.appendChild(
    document.createTextNode(name));
  const amountOfItem = document.createElement("span");
  amountOfItem.setAttribute("class", "amount-statistic");
  amountOfItem.appendChild(
    document.createTextNode(amount)
  );
  productItem.appendChild(amountOfItem);
  remainDiv.appendChild(productItem);
}

function addButtonsAndText(element) {
  let parent = element.parentNode;
  // console.log(parent);
  for(const child of parent.children) {
    if(child.className == "left-section") {

      for(const innerChild of child.children) {
        // console.log(innerChild);
        if(innerChild.className == "product-name-slesh") {
            innerChild.setAttribute("class", "product-name-text")
          }
      } 

    } else if(child.className == "middle-section") {
      let input;
      for(const innerChild of child.children) {
        if(innerChild.className == "amount") {
            input = innerChild;
          }
      } 
      const minusButton = document.createElement("button");
      if(input.value >= 2) {
        minusButton.setAttribute("class", "minus-button");
      } else {
        minusButton.setAttribute("class", "minus-button-disable");
      }
      minusButton.appendChild(document.createTextNode("–"));
      const tooltipMinus = document.createElement("section");
      tooltipMinus.setAttribute("class", "tooltip-div");
      const tooltipMinusText = document.createElement("label");
      tooltipMinusText.setAttribute("data-tooltip", "tooltip");
      tooltipMinusText.setAttribute("for", "tooltip");
      tooltipMinusText.appendChild(document.createTextNode("Зменшити кількість"));
      tooltipMinus.appendChild(tooltipMinusText);
      minusButton.appendChild(tooltipMinus);
      child.insertBefore(minusButton, input);
      const plusButton = document.createElement("button");
      plusButton.setAttribute("class", "plus-button");
      plusButton.appendChild(document.createTextNode("+"));
      const tooltipPlus = document.createElement("section");
      tooltipPlus.setAttribute("class", "tooltip-div");
      const tooltipPlusText = document.createElement("label");
      tooltipPlusText.setAttribute("data-tooltip", "tooltip");
      tooltipPlusText.setAttribute("for", "tooltip");
      tooltipPlusText.appendChild(document.createTextNode("Збільшити кількість"));
      tooltipPlus.appendChild(tooltipPlusText);
      plusButton.appendChild(tooltipPlus);  
      child.appendChild(plusButton);
    }
  }
}

function changeStateToBought(element) {
  let parent = element.parentNode;
  let mainParent = element.parentNode.parentNode;
  removePlusMinusAndMakeText(element);
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
  const noBuyButton = document.createElement("button");
  noBuyButton.setAttribute("class", "no-buy-button");
  noBuyButton.appendChild(document.createTextNode("Не куплено"));
  parent.appendChild(noBuyButton);
  makeBoughtItem(mainParent);
  saveData();
} 

function removePlusMinusAndMakeText(element) {
  let parent = element.parentNode.parentNode;
  for(const child of parent.children) {
    if(child.className == "middle-section") {
      for(const innerChild of child.children) {

        if(innerChild.className == "plus-button" 
          || innerChild.className == "minus-button"
          || innerChild.className == "minus-button-disable") {
            innerChild.remove();
          }
      }  
    } else if(child.className == "left-section") {
      for(const innerChild of child.children) {
        if(innerChild.className == "product-name-text") {
            innerChild.setAttribute("class", "product-name-slesh")
          }
      } 
    }

  } 
}

// changing names when user clicks on it
function changeNameOfProduct(element) {
  let oldName = element.innerText;
  let parent = element.parentNode;
  const end = oldName.length;
  element.remove();
  const textInput = document.createElement("input");
  textInput.setAttribute("class", "input-product-name");
  textInput.setAttribute("type", "text");
  textInput.setAttribute("value", oldName);
  textInput.setSelectionRange(end, end);
  parent.appendChild(textInput);
  textInput.focus();
  textInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      textInput.blur();
    }
  });
  textInput.addEventListener("blur", () => {
    replaceNames(textInput, parent, oldName);
    changeLeftItems(parent.parentNode, oldName);
    saveData();
  });
}  

function replaceNames(textInput, parent, oldName) {
  let newName;
  if(contains(names, textInput.value)) {
    newName = oldName;
    alert("You already have product with such name!");
  } else {
    newName = textInput.value;
    updateInArray(findName(oldName), newName);
    console.log(names);
  }
  textInput.remove();
  const newNameLabel = document.createElement("label");
  newNameLabel.setAttribute("class", "product-name-text");
  newNameLabel.setAttribute("for", "name");
  newNameLabel.appendChild(document.createTextNode(newName));
  parent.appendChild(newNameLabel);
}

function updateInArray(pos, newName) {
  names[pos] = newName;
}

function findName(oldName) {
  for(let i = 0; i < names.length; i++) {
    if(names[i] == oldName) {
      return i;
    }
  }
  return null;
}

function incrementProductAmount(element) {
  let parent = element.parentNode.parentNode;
  element.style.background = "rgb(130, 207, 130)";
  setTimeout(() => {
    element.style.background = "rgb(2, 199, 2)";
  }, 100);
  const amountInput = element.parentNode;
  for(const child of amountInput.children) {
    if(child.className == "amount") {
      let curNumber = child.getAttribute("value");
      curNumber = parseInt(curNumber, 10);
      curNumber++;
      for(const childA of amountInput.children) {
        if(childA.className == "minus-button-disable") {
          if(curNumber == 2) {
            childA.setAttribute("class", "minus-button"); 
          }
        }
      }
      child.setAttribute("value", curNumber);
    }
  }
  let oldName = findOutOldName(parent);
  changeLeftItems(parent, oldName);
  saveData();
}

function findOutOldName(parent) {
  for(const section of parent.children) {
    if(section.className == "left-section") {
      for(const element of section.children) {
        return element.textContent.trim();
      }
    }
  }
}

function decreaseProductAmount(element) {
  let parent = element.parentNode.parentNode;
  element.style.background = "rgb(236, 131, 131)";
  const amountInput = element.parentNode;
  for(const child of amountInput.children) {
    if(child.className == "amount") {
      let curNumber = child.getAttribute("value");
      curNumber = parseInt(curNumber, 10);
      if(curNumber <= 2) {
        child.setAttribute("value", 1);
        setTimeout(() => {
          element.style.background = "rgb(212, 56, 56)";
        }, 100);
        element.setAttribute("class", "minus-button-disable");
      } else {
        curNumber--;
        child.setAttribute("value", curNumber);
        setTimeout(() => {
          element.style.background = "rgb(212, 56, 56)";
        }, 100);
      }
    }
  }
  let oldName = findOutOldName(parent);
  changeLeftItems(parent, oldName);
  saveData();
}

function saveData() {
  console.log(getIncomeRows());
  console.log(getIncomeRows());
  const data = getIncomeRows().map(row => {
      if(!row.querySelector(".no-buy-button")) {
        return {
          name: row.querySelector(".product-name-text").textContent.trim(),
          amount: row.querySelector(".amount").value,
          buttonText: row.querySelector(".buy-button").textContent.trim(),
          isSold: false
        }
      } else {
        return {
          name: row.querySelector(".product-name-slesh").textContent.trim(),
          amount: row.querySelector(".amount").value,
          buttonText: row.querySelector(".no-buy-button").textContent.trim(),
          isSold: true
        }
      }
  });

  localStorage.setItem("products", JSON.stringify(data));
}

function getIncomeRows() {
  return Array.from(document.querySelectorAll(".operations-div .product-div"));
}

function getProducts() {
  let products;
  console.log(localStorage.getItem("products"));
  if(localStorage.getItem("products") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("products"));
  }
  products.forEach(function(product){
    const newProduct = document.createElement("section");
    newProduct.setAttribute("class", "product-div");
    // left section
    const leftSection = document.createElement("section");
    leftSection.setAttribute("class", "left-section");
      // name of the product
    const productName = document.createElement("label");
    if(product.isSold) {
      productName.setAttribute("class", "product-name-slesh");
    } else {
      productName.setAttribute("class", "product-name-text");
    }
    productName.setAttribute("for", "name");
    productName.appendChild(document.createTextNode(product.name));
    leftSection.appendChild(productName);
    
    // middle section
    const middleSection = document.createElement("section");
    middleSection.setAttribute("class", "middle-section");

    const rightSection = document.createElement("section");
    rightSection.setAttribute("class", "right-section");

    if(!product.isSold) {
      const minusButton = document.createElement("button");
      if(product.amount > 1) {
        minusButton.setAttribute("class", "minus-button");
      } else {
        minusButton.setAttribute("class", "minus-button-disable");
      }
      minusButton.appendChild(document.createTextNode("–"));
      const tooltipMinus = document.createElement("section");
      tooltipMinus.setAttribute("class", "tooltip-div");
      const tooltipMinusText = document.createElement("label");
      tooltipMinusText.setAttribute("data-tooltip", "tooltip");
      tooltipMinusText.setAttribute("for", "tooltip");
      tooltipMinusText.appendChild(document.createTextNode("Зменшити кількість"));
      tooltipMinus.appendChild(tooltipMinusText);
      minusButton.appendChild(tooltipMinus);

      const amountInput = document.createElement("input");
      amountInput.setAttribute("class", "amount");
      amountInput.setAttribute("type", "text");
      amountInput.setAttribute("value", product.amount);
      amountInput.setAttribute('readonly', true);

      // plus button
      const plusButton = document.createElement("button");
      plusButton.setAttribute("class", "plus-button");
      plusButton.appendChild(document.createTextNode("+"));
      const tooltipPlus = document.createElement("section");
      tooltipPlus.setAttribute("class", "tooltip-div");
      const tooltipPlusText = document.createElement("label");
      tooltipPlusText.setAttribute("data-tooltip", "tooltip");
      tooltipPlusText.setAttribute("for", "tooltip");
      tooltipPlusText.appendChild(document.createTextNode("Збільшити кількість"));
      tooltipPlus.appendChild(tooltipPlusText);
      plusButton.appendChild(tooltipPlus);
      
      middleSection.appendChild(minusButton);
      middleSection.appendChild(amountInput);
      middleSection.appendChild(plusButton);

      const buyButton = document.createElement("button");
        //buy button
      buyButton.setAttribute("class", "buy-button");
      buyButton.appendChild(document.createTextNode("Куплено"));
        // cross button
      const crossButton = document.createElement("button");
      crossButton.setAttribute("class", "cross-button");
      crossButton.appendChild(document.createTextNode("\u2716"));
      const tooltipCross = document.createElement("section");
      tooltipCross.setAttribute("class", "tooltip-div");
      const tooltipCrossText = document.createElement("label");
      tooltipCrossText.setAttribute("data-tooltip", "tooltip");
      tooltipCrossText.setAttribute("for", "tooltip");
      tooltipCrossText.appendChild(document.createTextNode("Скасувати"));
      tooltipCross.appendChild(tooltipCrossText);
      crossButton.appendChild(tooltipCross);   

      rightSection.appendChild(buyButton);
      rightSection.appendChild(crossButton);

    } else {
      const amountInput = document.createElement("input");
      amountInput.setAttribute("class", "amount");
      amountInput.setAttribute("type", "text");
      amountInput.setAttribute("value", product.amount);
      amountInput.setAttribute('readonly', true);

      middleSection.appendChild(amountInput);

      const noBuyButton = document.createElement("button");
      noBuyButton.setAttribute("class", "no-buy-button");
      noBuyButton.appendChild(document.createTextNode("Не куплено"));
      rightSection.appendChild(noBuyButton);
    }

    newProduct.appendChild(leftSection);
    newProduct.appendChild(middleSection);
    newProduct.appendChild(rightSection);

    document.querySelector(".operations-div").appendChild(newProduct);

    if(product.isSold) {
      makeBoughtItem(newProduct);
    } else {
      newLeftItem(product.name, product.amount);
    }
  });
  allAvailiableProduct = document.querySelectorAll(".product-div");
  fillWithDefaultValues();
}
