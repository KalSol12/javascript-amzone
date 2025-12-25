 export let cart= JSON.parse(localStorage.getItem('cart'));
 if (!cart) {
 cart=
 [{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1,
    deliveryOptionId:'1'
},
{
     productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:2,
    deliveryOptionId:'2'
}
];}

export function  addToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart)); 
}


 export function addToCart(productId,selectedQuantity) {
  
    let matchingItem;
    cart.forEach((item)=>{
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += selectedQuantity;
    } else {
      // quantity=selectedQuantity
      cart.push({
         productId,
        quantity:selectedQuantity,
        deliveryOptionId:'1'
      });
    }
    addToStorage();

  
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity = newQuantity;
    }
  });

  addToStorage();
  console.log(productId,newQuantity);
}
export function  removeFromCart(productId) {
   let newCart=[];
   cart.forEach((cartItem)=>{
    if (cartItem.productId!==productId) {
      newCart.push(cartItem)
   }
   })
   cart=newCart;
  addToStorage()
  

  
}



 export function  updateCartQuatity() {
  
    let cartQuantity = 0;
    cart.forEach((item)=>{
      cartQuantity += item.quantity;
    });
  

 

  return cartQuantity;

  
 }



export function updateDeliveryoption(productId,deliveryOptionId) {
  
    let matchingItem;
    cart.forEach((item)=>{
      if (productId === item.productId) {
        matchingItem = item;
      }
      
    });


    if (matchingItem) {
      matchingItem.deliveryOptionId=deliveryOptionId;
      addToStorage();
    }

  
}
