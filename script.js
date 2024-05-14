

const crudCrudUrl = "https://crudcrud.com/api/bbad9ced22e947a6867ea644647d0ab1/candies";


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

    document.querySelector("#formData").reset();
}

function displayChoco(candy) {

  if(!candy.candyName || !candy.desc || !candy.price || !candy.quantity){
    return;
  }
  
  let ul = document.querySelector("#chocoList");
  const li = document.createElement("li");
  ul.appendChild(li);
  li.innerHTML = ` ${candy.candyName} - ${candy.desc} - ${candy.price} - <span>${candy.quantity}</span>`;


  const buyOneBtn = document.createElement("button");
  buyOneBtn.textContent = "Buy One";
  buyOneBtn.addEventListener("click", () => buyCandy(candy._id,  candy.quantity-1));
  li.appendChild(buyOneBtn);

  const buyTwoBtn = document.createElement("button");
  buyTwoBtn.textContent = "Buy Two";
  buyTwoBtn.addEventListener("click", () => buyCandy(candy._id, candy.quantity-2));
  li.appendChild(buyTwoBtn);

  const buyThreeBtn = document.createElement("button");
  buyThreeBtn.textContent = "Buy Three";

  buyThreeBtn.addEventListener("click", () => buyCandy(candy._id,  candy.quantity-3));
  li.appendChild(buyThreeBtn);
}

function buyCandy(candyId, updatedQuantity) {

  if(updatedQuantity<0){
    alert("Not enough candies in stock");
    return
  }

  if (updatedQuantity == 0) {
    
    axios.delete(`${crudCrudUrl}/${candyId}`)
    fetchAndDisplayCandies()

    return
  }

  axios.get(`${crudCrudUrl}/${candyId}`)
    .then((res) => {

      let { _id, ...candy } = res.data;
      //const candy = res.data;
       console.log(candy)
      if (!candy) {
        console.log(`Candy not found with ID ${candyId}`);
        return;
      }

      const updatedCandy = { ...candy, quantity: updatedQuantity };
      return axios.put(`${crudCrudUrl}/${candyId}`, updatedCandy)
        .then((res) => {
          console.log(res.data);
          fetchAndDisplayCandies()
        })
        .catch((err) => console.log(err.message));
    })
  }




