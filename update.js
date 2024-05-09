


const axios = require('axios');


const crudCrudUrl = "https://crudcrud.com/api/9681b18f51ca4d1a815b9ddf84305635/candyDetails";



axios.get(`${crudCrudUrl}/663b8ed93207ed03e8c92aac`)
.then((res) => {
    let candy =res.data;
    console.log(candy)
    candy.quantity=candy.quantity-1
    console.log(candy)
    axios.put(`${crudCrudUrl}/663b8ed93207ed03e8c92aac`,candy)
    .then((res) => console.log(candy,res.data,res))
    .catch((err) => console.log(err))

})
.catch((err) => console.log(err))


