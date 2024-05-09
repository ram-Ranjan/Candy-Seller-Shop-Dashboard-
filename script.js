

const crudCrudUrl = "https://crudcrud.com/api/fbda7253e45d4828b69cc0945dbae737/candies";


function fetchAndDisplayCandies() {
  axios.get(crudCrudUrl)
      .then((res) => {
          const candies = res.data;
          const ul = document.querySelector("#chocoList");
          ul.innerHTML = ""; // Clear the list before appending new items
          candies.forEach(candy =>   displayChoco(candy));       
      })
      .catch((err) => console.log(err));
}

window.addEventListener('DOMContentLoaded', fetchAndDisplayCandies);



function saveChoco(event) {
    event.preventDefault();
    
    let candyName = event.target.candyName.value;
    let desc = event.target.desc.value;
    let price = event.target.price.value;
    let quantity = event.target.quantity.value;
    let candy = { candyName: candyName, desc: desc, price: price, quantity: quantity };

    axios.post(crudCrudUrl, candy)
        .then((res) => {
            console.log(res.data);
            fetchAndDisplayCandies(); // Fetch and display updated list
        })
        .catch((err) => console.log(err));
}

function displayChoco(candy) {
  let ul = document.querySelector("#chocoList");
  const li = document.createElement("li");
  ul.appendChild(li);
  li.innerHTML = ` ${candy.candyName} - ${candy.desc} - ${candy.price} - <span>${candy.quantity}</span>`;

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
    axios.get(`${crudCrudUrl}/${candyId}`)
      .then((res) => {
       // console.log(res.data)
         let {_id,...chocolate} = res.data;
         console.log(chocolate)
         console.log(chocolate._id)
        // console.log(newQuantity)

        if (chocolate) {
          // console.log(chocolate._id)
          chocolate.quantity = newQuantity;
          // console.log("************************ Data updating****************")
          // console.log(chocolate)
          // console.log(chocolate._id)
          
          
           const updatedChocolate = { ...chocolate, quantity: newQuantity };

          axios.put(`${crudCrudUrl}/${candyId}`,chocolate)
            .then((res) => {
              console.log(`Bought ${quantity} ${chocolate.candyName}`);
             fetchAndDisplayCandies()
            })
            .catch((err) => console.log(err.message));
        } 
        else {
          console.log(`Candy not found with ID ${candyId}`);
        }
      })
      .catch((err) => console.log(err));
  } else {
    console.log(`Not enough candy in stock`);
  }
}

