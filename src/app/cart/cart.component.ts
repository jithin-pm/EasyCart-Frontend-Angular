import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any = []
  totalAmount: any = 0
  constructor(private api: ApiService, private route:Router) { }
  ngOnInit(): void {
    this.getCartItems()
  }

  //get all cart items
  getCartItems() {
    this.api.getCartIemsApi().subscribe({
      next: (res: any) => {
        this.cartItems = res
        console.log("cart items :::", this.cartItems);
        this.getGrandTotal()
      },
      error: (res: any) => {
        console.log(res);
      }
    })
  }

  //deleting items from the cart 
  removeCartItem(productId: any) {
    console.log(productId);

    this.api.deleteCartItemApi(productId).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Good job!",
          text: "successfully deleted item from cart",
          icon: "success"
        });
        this.getCartItems()
        this.api.updateCartCount()
      },
      error: (res: any) => {
        Swal.fire({
          title: "Error!",
          text: "sorry,an error in deleting cart item",
          icon: "error"
        });
        console.log("delete product ::", res);
      }

    })
  }

  //grand total
  getGrandTotal() {
    if (this.cartItems.length > 0) {
      this.totalAmount = Math.ceil(this.cartItems.map((item: any) => item.grandTotal).reduce((amt1: any, amt2: any) => amt1 + amt2))
      console.log(this.totalAmount);
    }
    else {
      this.totalAmount = 0
    }
  }

  increamentCartItem(id: any) {
    this.api.increamentCartItemApi(id).subscribe({
      next: (res: any) => {
        this.getCartItems();
        this.api.updateCartCount()
      },
      error: (res: any) => {

      }
    })
  }

  //decreamenting cart items
  decreamentCartItem(id: any) {
    this.api.decreamentCartItemApi(id).subscribe({
      next: (res: any) => {
        this.getCartItems();
        this.api.updateCartCount()
      },
      error: (res: any) => {
      }
    })

  }

  //deleteng cart items
  deleteCartItems(){
    this.api.emptyCartItemsApi().subscribe({
      next: (res: any) => {
        this.getCartItems();
        this.api.updateCartCount()
      },
      error: (res: any) => {
      }
    })
  }

  checkOut(){
  this.route.navigateByUrl('/checkout')
  sessionStorage.setItem("grandTotal",this.totalAmount)
  }
  


}




