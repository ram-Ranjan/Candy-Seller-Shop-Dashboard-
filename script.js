

const crudCrudUrl = "https://crudcrud.com/api/a01383d958c2432296644b012dac0fee/candies";
let total=0;

function fetchAndDisplayCandies() {
  total=0
  axios.get(crudCrudUrl)
    .then((res) => {
      const candies = res.data;
      const ul = document.querySelector("#chocoList");
      ul.innerHTML = ""; // Clear the list before appending new items
      candies.forEach(candy => displayChoco(candy));

      updateTotal();
      

    })
    .catch((err) => console.log(err));
}

window.addEventListener('DOMContentLoaded', fetchAndDisplayCandies);

function updateTotal(){
  let amount = document.querySelector('#total');
  amount.value = total;
}

function saveChoco(event) {
  event.preventDefault();

  let candyName = event.target.candyName.value;
  let desc = event.target.desc.value;
  let price = event.target.price.value;
  let quantity = event.target.quantity.value;
  let candy = { candyName: candyName, desc: desc, price: price, quantity: quantity };


  if(!candy.candyName || !candy.desc || !candy.price || !candy.quantity){
    return;
  }

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

  const buyOneBtn = createBuyButton("One",candy);
  const buyTwoBtn = createBuyButton("Two",candy)
  const buyThreeBtn = createBuyButton("Three",candy)

  if(candy.price && candy.quantity)
    total+=Number(candy.price)*Number(candy.quantity);

  li.appendChild(buyOneBtn);
  li.appendChild(buyTwoBtn);
  li.appendChild(buyThreeBtn);
}
  
  
  function createBuyButton(quantity , candy){
    const btn = document.createElement("button");
    btn.textContent=`Buy ${quantity}`;
    
    btn.addEventListener("click",(event) => {
      event.stopPropagation(); // Stop event propagation
      const updatedQuantity = candy.quantity - (quantity === "One" ? 1 : quantity === "Two" ? 2 : 3);
      buyCandy(candy._id,updatedQuantity)
    });
      return btn;
  }






function buyCandy(candyId,  updatedQuantity) {


  if(updatedQuantity<0){
    alert("Not enough candies in stock");
    return;
  }

  if (updatedQuantity == 0) {
    
    axios.delete(`${crudCrudUrl}/${candyId}`)
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
       axios.put(`${crudCrudUrl}/${candyId}`, updatedCandy)
        .then(() => {
          fetchAndDisplayCandies()
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  }



