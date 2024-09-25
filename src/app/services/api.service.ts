import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url = 'http://localhost:3000'
  constructor(private http: HttpClient) { 
    this.updateCartCount()
    this.updateWishlistCount()
  }

  //common function for header component
  addTokenHeader() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem("token")
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }

  //behaviour subject creation for wishlist count
  wishlistCount = new BehaviorSubject(0)
  updateWishlistCount() {
    this.getWishlistItemsApi().subscribe((res: any) => {
      this.wishlistCount.next(res.length)
    })
  }

    //behaviour subject creation for cart count
    cartCount = new BehaviorSubject(0)
    updateCartCount(){
      this.getCartIemsApi().subscribe((res:any)=>{
        this.cartCount.next(res.length)
      })
    }



  //get all products
  getAllProductsApi() {
    return this.http.get(`${this.server_url}/get-allProducts`)
  }

  //user Registration
  userRegistration(user: any) {
    return this.http.post(`${this.server_url}/registration`, user)
  }
  //user login
  userLogin(userLogin: any) {
    return this.http.post(`${this.server_url}/login`, userLogin)
  }

  //get product details
  getProductDetailsApi(productId: any) {
    return this.http.get(`${this.server_url}/get-productDetails/${productId}`)
  }

  //add to wishlists
  addToWishlistApi(product: any) {
    return this.http.post(`${this.server_url}/addToWishlists`, product, this.addTokenHeader())
  }

  //get Items From wishlist
  getWishlistItemsApi() {
    return this.http.get(`${this.server_url}/getWishlistItems`, this.addTokenHeader())
  }

  // add to cart
  addToCartApi(product: any) {
    return this.http.post(`${this.server_url}/addToCart`, product, this.addTokenHeader())
  }

  //get cart items
  getCartIemsApi() {
    return this.http.get(`${this.server_url}/getCartItems`,this.addTokenHeader())
  }

  //removing items from wishlist
  deleteWishlistItemsApi(productId: any) {
    console.log("kolll:::", productId);
    return this.http.delete(`${this.server_url}/deleteWishlistItems/${productId}`, this.addTokenHeader())
  }

  //remove cart item
  deleteCartItemApi(productId:any){
    return this.http.delete(`${this.server_url}/deleteCartItem/${productId}`,this.addTokenHeader())
  }

//incraement item in cart
increamentCartItemApi(id:any){
  console.log("inside incraement cart item");
  
  return this.http.get(`${this.server_url}/cart/increament/${id}`,this.addTokenHeader())
  
}

//decreamenting cart items
decreamentCartItemApi(id:any){
  return this.http.get(`${this.server_url}/cart/decreament/${id}`,this.addTokenHeader())
}

//deleting cart items
emptyCartItemsApi(){
return this.http.delete(`${this.server_url}/cart/deleteCartItems`,this.addTokenHeader())
}

}
