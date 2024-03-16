var layer=document.querySelector('.layer');
var tbody=document.querySelector('tbody');
var productName=document.querySelector('#productName');
var productPrice=document.querySelector("#productPrice");
var productCategory=document.querySelector("#productCategory");
var productDetails=document.querySelector("#productDetails");
var dynamicHeader=document.querySelector('.header h2');
var dynamicButton=document.querySelector('.btns button:nth-of-type(2)');
var products=[];
if(localStorage.getItem("products")){
    products=JSON.parse(localStorage.getItem("products"));
    displayAllProducts(products);
}
var id =products.length == 0 ? 0 : products[products.length-1].id+1;
var updatedProductindex=0;
function closeLayer(){  
  resetErrors();
    layer.style.display="none";
    dynamicHeader.innerHTML="Add Product";
    dynamicButton.classList.replace('btn-warning','btn-success');
    dynamicButton.innerHTML="Add";
}
function showLayer(){
    layer.style.display="block";
    document.querySelector(".deleteAll").style.display="none";
    document.querySelector(".addProduct").style.display="block";
}
function resetErrors(){
    var errors =document.querySelectorAll(".error");
    if (errors){
        errors.forEach(error=>{
            error.style.display="none";
        })
    }
}
function addProduct(){
    if(productNameValidation(productName.value) && productPriceVaildation(productPrice.value) && ProductCategoryValidation(productCategory.value)){
        resetErrors();
        var newProduct={
            id:id,
            name:productName.value,
            price:Number(productPrice.value),
            category:productCategory.value,
            details:productDetails.value
        };
        id++;
        products.push(newProduct);
        localStorage.setItem("products",JSON.stringify(products))
        displayAddedProduct(newProduct);
        clearInputs();
    }
    else{
        if(!productNameValidation(productName.value)){
           var errorName= document.querySelector('.errorName');
           errorName.style.display="block";
           errorName.innerHTML="Not Valid input!";
        }else{

        }
        if(!productPriceVaildation(productPrice.value)){
            var errorPrice= document.querySelector('.errorPrice');
            errorPrice.style.display="block";
            errorPrice.innerHTML="Not Valid input!";
        }
        if(!ProductCategoryValidation(productCategory.value)){
            var errorCategory= document.querySelector('.errorCategory');
            errorCategory.style.display="block";
            errorCategory.innerHTML="Not Valid input!";
           
        }
    }
 
}
function displayAddedProduct(product){
   
        var newRow=document.createElement('tr');
        newRow.innerHTML=
        `
            <td>
                <input type="checkbox" name="selectRow">
            </td>
            <td>
                ${product.name}
            </td>
            <td>
                ${product.price} EGP
            </td>
            <td>
                ${product.category}
            </td>
            <td>
                ${product.details}
            </td>
            <td>
                <i class="fa-solid fa-pen text-warning px-2" onclick="displayUpdatedProduct(${product.id})"></i>
                <i class="fa-solid fa-trash-can text-danger" onclick="deleteProduct(this,${product.id})"></i>
            </td>
        `;
        newRow.setAttribute('id',`${product.id}`)
        newRow.addEventListener("click",function(){
            selectCheckedBox(this);
        })
        tbody.appendChild(newRow);
}

function clearInputs(){
    productName.value="";
    productPrice.value="";
    productCategory.value="";
    productDetails.value="";
}
function deleteProduct(ele,id){
    products.forEach(product => {
        if(product.id==id){
            products.splice(products.indexOf(product),1);
        }
    });
    ele.parentNode.parentNode.remove();
    localStorage.setItem("products",JSON.stringify(products))
}

function displayUpdatedProduct(id)
{   
    products.forEach(product => {
        if(product.id==id){
            updatedProductindex= products.indexOf(product);
        }
    });
    showLayer();
    dynamicHeader.innerHTML="Update Product";
    dynamicButton.classList.replace('btn-success','btn-warning');
    dynamicButton.innerHTML="Update";
    productName.value=products[updatedProductindex].name;
    productPrice.value=products[updatedProductindex].price;
    productCategory.value=products[updatedProductindex].category;
    productDetails.value=products[updatedProductindex].details;

}

function checkFunctionality(){
    if(dynamicButton.innerHTML.includes("Add")){
        addProduct();
    }else{
        updateProduct();
        layer.style.display="none";
        dynamicHeader.innerHTML="Add Product";
        dynamicButton.classList.replace('btn-warning','btn-success');
        dynamicButton.innerHTML="Add";
    }
}

function updateProduct(){
    console.log(products , updatedProductindex);
    products[updatedProductindex].name= productName.value;
    products[updatedProductindex].price=productPrice.value;
    products[updatedProductindex].category=productCategory.value;
    products[updatedProductindex].details=productDetails.value;
    var updatedRow=document.querySelector(`tr[id='${products[updatedProductindex].id}']`);
    updatedRow.innerHTML=
    `
            <td>
                <input type="checkbox" name="selectRow">
            </td>
            <td>
                ${products[updatedProductindex].name}
            </td>
            <td>
                ${ products[updatedProductindex].price} EGP
            </td>
            <td>
                ${ products[updatedProductindex].category}
            </td>
            <td>
                ${ products[updatedProductindex].details}
            </td>
            <td>
                <i class="fa-solid fa-pen text-warning px-2" onclick="displayUpdatedProduct(${products[updatedProductindex].id})"></i>
                <i class="fa-solid fa-trash-can text-danger" onclick="deleteProduct(this,${products[updatedProductindex].id})"></i>
            </td>
        `;
        clearInputs(); 
        localStorage.setItem("products",JSON.stringify(products))
}

function displayAllProducts(products){
    tbody.innerHTML="";
    for(var i=0;i<products.length;i++){
        tbody.innerHTML +=
        `
        <tr id="${products[i].id}" onclick=" selectCheckedBox(this)">
            <td>
                <input type="checkbox" name="selectRow">
            </td>
            <td>
                ${products[i].name}
            </td>
            <td>
                ${products[i].price} EGP
            </td>
            <td>
                ${products[i].category}
            </td>
            <td>
                ${products[i].details}
            </td>
            <td>
                <i title="Edit" class="fa-solid fa-pen text-warning px-2" onclick="displayUpdatedProduct(${products[i].id})"></i>
                <i title="Delete" class="fa-solid fa-trash-can text-danger" onclick="deleteProduct(this,${products[i].id})"></i>
            </td>
        </tr>
    `;
        ;
    }
}

function serch(searchTerm){
    console.log(searchTerm);
    var searchedArr=[];
    for(var i = 0 ; i<products.length; i++){
        if(products[i].name.toLowerCase().includes(searchTerm.trim().toLowerCase())){
            searchedArr.push(products[i]);
        }
        displayAllProducts(searchedArr);

    }
}

var selectedAll=document.querySelector('thead input[type=checkbox]');

selectedAll.addEventListener("click",function(){
    var allCheckBox=document.querySelectorAll('tbody input[type=checkbox]');
    if(this.checked){
        allCheckBox.forEach(element => {
            element.checked=true;
        });
    }else{
        allCheckBox.forEach(element => {
            element.checked=false;
        });
    }
})
// var allRows=document.querySelectorAll("tbody tr");
// console.log(allRows);
function selectCheckedBox(ele){
    if( ele.children[0].children[0].checked){
        ele.children[0].children[0].checked=false;
    }else{
        ele.children[0].children[0].checked=true;
    }
    
}

function deleteSelected(){
    layer.style.display="block";
    document.querySelector(".addProduct").style.display="none";
    document.querySelector(".deleteAll").style.display="block";
}

function deleteSelectedProducts(){
   var allSeletedRows=document.querySelectorAll('tbody input[type=checkbox]');
   allSeletedRows.forEach(input=>{
            if(input.checked){
            var id=input.parentNode.parentNode.id;
            deleteProduct(input,id);
            }
   })
   layer.style.display="none";
   
}


function productNameValidation(productName){
    var nameRegex=/^[A-Za-z]{2,20}$/;
    return nameRegex.test(productName);
}

function productPriceVaildation(productPrice){
    var priceRegex=/^[1-9][0-9]?$/;
    return priceRegex.test(productPrice);
}

function ProductCategoryValidation(productCategory){
    if(productCategory){
        return true;
    }
    else{
        return false;
    }
}