
// function saveChoco(event){
//     event.preventDefault();

//     let candyName = event.target.candyName.value;
//     let desc = event.target.desc.value;

//     let price = event.target.price.value;

//     let quantity = event.target.quantity.value;

//     let candy ={
//         candyName:candyName,
//         desc:desc,
//         price:price,
//         quantity:quantity
//     }

    
//     // axios.post("https://crudcrud.com/api/7b4feae5e49247468787db262e51ab73/candies",candy)
//     // .then((res) => {
//     //     console.log(res)
//     // })
//     // .catch((err) => console.log(err))

//     let ul = document.querySelector("#chocoList");
//     const li =document.createElement("li");
//     ul.appendChild(li);
//     li.innerHTML(`${candyName} - ${desc} - ${price} - ${quantity} `)// <button id="buyOne">BuyOne</button>  <button id="buyTwo">BuyTwo</button> <button id="buyThree">BuyThree</button>`)

// }


const crudCrudUrl = "https://crudcrud.com/api/7b4feae5e49247468787db262e51ab73/candies";

function saveChoco(event) {
  event.preventDefault();
  let candyName = event.target.candyName.value;
  let desc = event.target.desc.value;
  let price = event.target.price.value;
  let quantity = event.target.quantity.value;
  let candy = {
    candyName: candyName,
    desc: desc,
    price: price,
    quantity: quantity
  };

  axios.post(crudCrudUrl, candy)
    .then((res) => {
      console.log(res.data);
      displayChoco(res.data);
    })
    .catch((err) => console.log(err));
}

function displayChoco(candy) {
    let ul = document.querySelector("#chocoList");
    const li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = `${candy.candyName} - ${candy.desc} - ${candy.price} - ${candy.quantity}`;
  
    const buyOneBtn = document.createElement("button");
    buyOneBtn.textContent = "Buy One";
    buyOneBtn.addEventListener("click", () => buyCandy(candy._id, 1, candy.quantity));
    li.appendChild(buyOneBtn);
  
    const buyTwoBtn = document.createElement("button");
    buyTwoBtn.textContent = "Buy Two";
    buyTwoBtn.addEventListener("click", () => buyCandy(candy._id, 2, candy.quantity));
    li.appendChild(buyTwoBtn);
  
    const buyThreeBtn = document.createElement("button");
    buyThreeBtn.textContent = "Buy Three";
    buyThreeBtn.addEventListener("click", () => buyCandy(candy._id, 3, candy.quantity));
    li.appendChild(buyThreeBtn);
  }
  
  function buyCandy(candyId, quantity, currentQuantity) {
    const newQuantity = currentQuantity - quantity;
    if (newQuantity >= 0) {
      axios.put(`${crudCrudUrl}/${candyId}`, { quantity: newQuantity })
        .then(() => {
          console.log(`Bought ${quantity} candy`);
          const li = document.querySelector(`li:contains("${candyId}")`);
          li.innerHTML = li.innerHTML.replace(currentQuantity, newQuantity);
        })
        .catch((err) => console.log(err));
    } else {
      console.log(`Not enough candy in stock`);
    }
  }

window.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayCandies();
  });
  
  function fetchAndDisplayCandies() {
    axios.get(crudCrudUrl)
      .then((res) => {
        const candies = res.data;
        const ul = document.querySelector("#chocoList");
        ul.innerHTML = ""; // Clear the list before appending new items
  
        candies.forEach(candy => {
          displayChoco(candy);
        });
      })
      .catch((err) => console.log(err));
  }