
var productNameInput=document.getElementById("productName");
var productPriceInput=document.getElementById("productPrice");
var productCatogeryInput=document.getElementById("productCatogry");
var productDescriptionInput=document.getElementById("productDescription");
var searchInput=document.getElementById('searchInput');
var addBtn=document.getElementById('addBtn');
var inputs=document.getElementsByClassName('fotm-control');
var currentIndex=0;
var products=[];
var nameAlert=document.getElementById('nameAlert')
// retreive
if(JSON.parse(localStorage.getItem('productList'))!=null)
{
products= JSON.parse(localStorage.getItem('productList'));
displayProduct()
}


addBtn.onclick=function()
{
   if (addBtn.innerHTML=='Add Product'){
      addProduct();
   }
else{
   updateProduct();
}
displayProduct();
clearForm();
}


function addProduct()
{
   var product=
   {
      name:productNameInput.value,
      price:productPriceInput.value,
      catogery:productCatogeryInput.value,
      description:productDescriptionInput.value,
   }
   products.push(product);
   localStorage.setItem('productList',JSON.stringify(products))
}


function displayProduct()
{
   var cartona='';
   for(var i=0; i<products.length; i++){
      cartona+=`<tr>
      <td>${products[i].name}</td>
      <td>${products[i].price}</td>
      <td>${products[i].catogery}</td>
      <td>${products[i].description}</td>
      <td><button class='btn btn-warning' onclick=getProductInfo(${i})>Update</button></td>
      <td><button class='btn btn-danger'onclick=deleteProduct(${i})>Delete</button></td>
      </tr>`
   }
   document.getElementById('tableBody').innerHTML=cartona;
}


function deleteProduct(index){
   products.splice(index,1);
   displayProduct();
   localStorage.setItem('productList',JSON.stringify(products))
}

function clearForm()
{
   for(var i=0;i<inputs.lenght;i++)
   {
inputs[i].value=''
   }
}

searchInput.onkeyup=function()
{
   var cartona='';
   for(var i=0; i<products.length; i++){
      if(products[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
      cartona+=`<tr>
      <td>${products[i].name}</td>
      <td>${products[i].price}</td>
      <td>${products[i].catogery}</td>
      <td>${products[i].description}</td>
      <td><button class='btn btn-warning'>Update</button></td>
      <td><button class='btn btn-danger'onclick=deleteProduct(${i})>Delete</button></td>
      </tr>`
   }
   document.getElementById('tableBody').innerHTML=cartona;
}

function getProductInfo(index)
{
   currentIndex=index;
  var currentProduct=products[index];
productNameInput.value=currentProduct.name;
productPriceInput.value=currentProduct.price;
productCatogeryInput.value=currentProduct.catogery;
productDescriptionInput.value=currentProduct.description;
addBtn.innerHTML='Update Product';

}

function updateProduct()
{
   var product=
   {
      name:productNameInput.value,
      price:productPriceInput.value,
      catogery:productCatogeryInput.value,
      description:productDescriptionInput.value,
   }
   products[currentIndex]=product;
   localStorage.setItem('productList',JSON.stringify(products));
   addBtn.innerHTML='Add Product';
}


// validationn
productNameInput.onkeyup=function(){
   var rejexName=/^[A-Z][a-z]{2,9}$/;
  if(rejexName.test(productNameInput.value)) //valid
  {
   addBtn.removeAttribute('disabled');
   productNameInput.classList.add('is-valid');
   productNameInput.classList.remove('is-invalid');
   nameAlert.classList.add('d-none');
  }
  else{                                        //not vaild
      addBtn.disabled='true';
      productNameInput.classList.add('is-invalid');
      productNameInput.classList.remove('is-valid');
      nameAlert.classList.remove('d-none');
  }
}


productPriceInput.onkeyup=function(){
   var rejexPrice=/^[2-7][0-9]|80$/;
  if(rejexPrice.test(productPriceInput.value)) //valid
  {
   addBtn.removeAttribute('disabled');
   productPriceInput.classList.add('is-valid');
   productPriceInput.classList.remove('is-invalid');
   priceAlert.classList.add('d-none');
  }
  else{                                        //not vaild
      addBtn.disabled='true';
      productPriceInput.classList.add('is-invalid');
      productPriceInput.classList.remove('is-valid');
      priceAlert.classList.remove('d-none');
  }
}
