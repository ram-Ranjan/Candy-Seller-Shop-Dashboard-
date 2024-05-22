
const crudCrudUrl =
  "https://crudcrud.com/api/22a7bd65cbf6490b8313f08e82bd61e2/candies";
let total = 0;
let candies = [];

fetchAndDisplayCandies();


function fetchAndDisplayCandies() {
  axios
    .get(crudCrudUrl)
    .then((res) => {
      candies = res.data;
      displayCandies();
      updateTotal();
    })
    .catch((err) => console.log(err));
}


//We dont need an event listener dirctly call the method at top
 //window.addEventListener('DOMContentLoaded', fetchAndDisplayCandies);


// Adding Candies
//just add the form and create event listener on submit

const candyForm = document.getElementById('candyForm');
candyForm.addEventListener('submit',(event) => {
  event.preventDefault();

  const candyName = event.target.candyName.value;
  const desc = event.target.desc.value;
  const price = event.target.price.value;
  const quantity = event.target.quantity.value;

  if (!candyName || !desc || !price || !quantity) {
    return;
  }

  const candy = { candyName, desc, price, quantity };

  axios
  .post(crudCrudUrl, candy)
  .then(() => {
    candyForm.reset();
    fetchAndDisplayCandies();
  })
  .catch((err) => console.log(err));
});


function updateTotal() {
  total = candies.reduce((acc, candy) => acc + candy.price * candy.quantity, 0);
  document.getElementById("total").value = total;
}

function displayCandies() {
  const candyList = document.querySelector("#candyList");
  candyList.innerHTML = ""; // Clear the list before appending new items

  candies.forEach((candy) => {
    const candyItem = document.createElement("div");
    candyItem.classList.add("candy-item");

    const candyInfo = document.createElement("div");
    candyInfo.textContent = `${candy.candyName}  - ${candy.desc}  - ${candy.price} - quantity: ${candy.quantity}`;

    const buyBtns = document.createElement("div");
    buyBtns.appendChild(createBuyButton("One", candy));
    buyBtns.appendChild(createBuyButton("Two", candy));
    buyBtns.appendChild(createBuyButton("Three", candy));

    // const candyItem = document.createElement("div")

    candyItem.appendChild(candyInfo);
    candyItem.appendChild(buyBtns);
    candyList.appendChild(candyItem);
   
  });
}

function createBuyButton(quantity, candy) {
  const btn = document.createElement("button");
  btn.textContent = `Buy ${quantity}`;

  btn.addEventListener("click", () => {
    const updatedQuantity =
      candy.quantity - (quantity === "One" ? 1 : quantity === "Two" ? 2 : 3);
    buyCandy(candy._id, updatedQuantity);
  });
  return btn;
}

function buyCandy(candyId,  updatedQuantity) {

  if(updatedQuantity<0){
    alert("Not enough candies in stock");
    return;
  }

  if (updatedQuantity === 0) {

    axios
    .delete(`${crudCrudUrl}/${candyId}`)
    .then(() => fetchAndDisplayCandies())
    .catch((error) => console.log(error))
    return;
  }
      axios.get(`${crudCrudUrl}/${candyId}`)
      .then((response) => {
        let { _id, ...candy } = response.data;

        if (!candy) {
          console.log(`Candy not found with ID ${candyId}`);
          return;
        }

      const updatedCandy = { ...candy, quantity: updatedQuantity };
       axios
       .put(`${crudCrudUrl}/${candyId}`, updatedCandy)
        .then(() => {
          fetchAndDisplayCandies()
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  }


