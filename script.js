

const crudCrudUrl = "https://crudcrud.com/api/25df059a0e9e4599bbfa91ea31761027/candies";


function fetchAndDisplayCandies() {
  axios.get(crudCrudUrl)
    .then((res) => {
      const candies = res.data;
      const ul = document.querySelector("#chocoList");
      ul.innerHTML = ""; // Clear the list before appending new items
      candies.forEach(candy => displayChoco(candy));
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
  if (newQuantity < 0) {
    alert("Not enough candies in stock");
    return
  }

  axios.get(`${crudCrudUrl}/${candyId}`)
    .then((res) => {

      let { _id, ...candy } = res.data;
      //const candy = res.data;
      // console.log(candy)
      if (!candy) {
        console.log(`Candy not found with ID ${candyId}`);
        return;
      }

      const updatedCandy = { ...candy, quantity: newQuantity };
      return axios.put(`${crudCrudUrl}/${candyId}`, updatedCandy)
        .then((res) => {
          console.log(res.data);
          fetchAndDisplayCandies()
        })
        .catch((err) => console.log(err.message));
    })
  }


// 


