
var id =window.location.search.substring(4)
// console.log(id);

function showSingleProduct(){

      var products=fetch_data_from_storage('products')
      var pro_img =document.getElementById('sigle-imge')
      var pro_title =document.getElementById('name')
      var pro_rate =document.getElementById('rate')
      var pro_price =document.getElementById('price')
      var pro_sale =document.getElementById('sale')
      var pro_quntity =document.getElementById('quntity')
      var pro_categorie =document.getElementById('categorie')
      var pro_descr =document.getElementById('descr')
      var sigleAddCart =document.getElementById('sigleAddCart')

      // var star=document.getElementsByClassName('starrr')
      var sigle_product=products.filter(product=>product.id==id)
      
      console.log(sigle_product);
      
      sigle_product.forEach(s_product=>{ 
             
                    pro_img.setAttribute('src',s_product.img)
                    pro_title.innerHTML=s_product.title
                    pro_rate.innerHTML=`<i class="starrr" style="color:rgb(251, 255, 0)" class="fa-solid fa-star"></i>`
                    pro_price.innerHTML=s_product.price
                    pro_sale.innerHTML=s_product.sale
                    pro_quntity.innerHTML=s_product.quantity
                    pro_categorie.innerHTML=s_product.category
                    pro_descr.innerHTML=s_product.description
                    sigleAddCart.setAttribute('id','btnAddCart'+s_product.id)
                    sigleAddCart.click=add_to_cart(s_product.id)
                    // sigleAddCart.click=
                    // pro_name.innerHTML=s_product.title
                  })

}

showSingleProduct()
// =====================================
// sigleAddCart.click=add_to_cart(id)
function add_to_cart(product_id){
  if(getCookie('userToken')||getAdminTokenCookie())
      {
      var qty;
      var productCart;
      console.log('from single');
      // var oldqty
      //var disableCart= 'btnAddCart'+product_id 
      var stored_cart_data=fetch_data_from_storage('carts')||[]
          // stored_cart_data.forEach(cartProduct => {
          //                                             Check_id=cartProduct.pro_id;
          //                                             qty=cartProduct.quntity
          //                                         })
                                                                             
             var existProductCard = stored_cart_data.find(el => el.pro_id == product_id);             
              if(!existProductCard){
                  products_data.forEach(product => {
                      if (product.id == product_id) {
                              productCart={
                                          quntity:1,
                                          pro_id:product.id,
                                          pro_name:product.title,
                                          pro_img:product.img,
                                          pro_price:product.price
                              }} });
                      stored_cart_data.push(productCart)
                      store_data_in_storage('carts',stored_cart_data)  
                      changeAddToCard(product_id )
                      // document.getElementById(disableCart).classList.remove('btn-primary')
                      // document.getElementById(disableCart).classList.add('btn-light')
              }
          else{
              // qty=
              // products_data.forEach(product => {
              //     if (product.id == product_id) {
              //         store_data_in_storage('carts','') 
              //         var x=stored_cart_data.findIndex(id => id.pro_id == '3');
              //         console.log(x);
              //         // Check_id
              //         // store_data_in_storage('carts',stored_cart_data)
              //             productCart={
              //                         quntity:qty+1,
              //                         pro_id:product.id,
              //                         pro_name:product.title,
              //                         pro_img:product.img,
              //                         pro_price:product.price
              //             }
                  
              //         } });
              //     stored_cart_data.push(productCart)
              //     store_data_in_storage('carts',stored_cart_data)  
          
              update_cart(existProductCard.quntity ,existProductCard.pro_id)    
              changeAddToCard(product_id )         
                  // document.getElementById(disableCart).classList.remove('btn-primary')
                  //  document.getElementById(disableCart).classList.add('btn-light')
 
       }



  }else{
      location.href = '../login.html'
  }        
}
               

// =======================================================================================================
            // fetch data from storage 
// =======================================================================================================

function fetch_data_from_storage(storage_get_item){
  var arr_data=localStorage.getItem(storage_get_item)

  var parse_data=JSON.parse(arr_data)

  return parse_data
}
// =============================================
function getCookie(name) {
  var nameEQ = name + "=";

  var ca = document.cookie.split(';');

  for(var i=0;i < ca.length;i++) {

      var c = ca[i];

      while (c.charAt(0)==' ') c = c.substring(1,c.length);

      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      
  }
  return null;
}