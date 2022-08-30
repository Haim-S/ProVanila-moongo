// const drinks = require("../backend/data/data");


const tableBody = document.querySelector("[data-table-body]");
const formElement = document.querySelector("[data-animals-form]");
const inputName = document.querySelector("[data-name-input]");
const inputPrice = document.querySelector("[data-price-input]");
const StockInput = document.querySelector("[data-stock-input]");
const RatingInput = document.querySelector("[data-rating-input]");

const btnAllDrinks = document.querySelector("[data-btn-AllDrinks]");
const btnCheapDrinks = document.querySelector("[data-btn-CheapDrinks]");
// const btnbestDrinks = document.querySelector("[data-btn-bestDrinks]");

const editModal = document.querySelector("[data-edit-modal]");
const editInput = document.querySelector("[data-edit-input]");
const formEl2 = document.querySelector("#formEl2")

const END_POINT = "http://localhost:3000/";



function getAll() {
    fetch(END_POINT + "all")
        .then((res) => res.json())
        .then((drinks) => renderDrinks(drinks));



}

function getCheapDrinks() {
    fetch(END_POINT + "CheapDrinks")
    .then((res) => res.json())
    .then((drinks) => renderDrinks(drinks));
}


function getbestDrinks() {
    fetch(END_POINT + "bestDrinks")
    .then((res) => res.json())
    .then((drink)=> renderDrinks(drink));
}

function deletDrinks(id) {
    fetch(END_POINT + `del/${id}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then(renderDrinks);
}


let drinksUpdataId;

function showModal(name, id) {
    drinksUpdataId = id;
    formEl2.style.display = "flex";
    editModal.style.display = "flex";
    editInput.value = name;
}




formElement.onsubmit = (e) => {
    e.preventDefault();

    const body = {
        name: inputName.value,
        price: inputPrice.value,
        Stock: StockInput.value,
        rating: RatingInput.value,
    }

    fetch(END_POINT + "create", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        })
        .then((res) => res.json())
        .then((data) => renderDrinks(data));

}

formEl2.onsubmit = (e) =>{
    e.preventDefault();

    const body = {
        name: editInput.value
    }

fetch(END_POINT + `updata/${drinksUpdataId}`, {
    method: 'PUT',
    headers:{
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
}).then((res) => res.json())
.then((data) => renderDrinks(data));

formEl2.style.display = "none";
editModal.style.display = "none";

}





function renderDrinks(drinks) {
    const drinksElemnt = drinks.map(
        (drink) => `
        <div class="col">
         <div class="border p-3">
                    <table class="table table-striped table-hover table-borderless" style="width:100%">
                        <thead>
     <tr>
                                <th>id: ${drink._id}</th>
                            <tr>
                                <th>name: ${drink.name}</th>
                            <tr>
                                <th>price: ${drink.price}</th>
                            </tr>
                            <tr>
                                <th>Stock: ${drink.Stock}</th>
                                  <t>
                                   <tr>
                                <th>rating: ${drink.rating}</th>
                                  <t>
                                    <img style = "width: 80% ;"
                                    src = "${drink.img}"
                                    alt = ""
                                    srcset = "">
                            </tr>
                            <td><span class="btn btn-outline-danger" onclick="deletDrinks('${drink._id}')">X</span></td>
                             <td><span class="btn btn-outline-info" onclick="showModal('${drink.name}', '${drink._id}')">Edit</span></td>
                    </table>
                </div>
            </div>
        </div>
        
    `)
    tableBody.innerHTML = drinksElemnt.join("");
}


window.addEventListener("DOMContentLoaded", getAll(), btnAllDrinks.addEventListener("click", getAll), btnCheapDrinks.addEventListener("click", getCheapDrinks));

//  btnbestDrinks.addEventListener("click", getbestDrinks)