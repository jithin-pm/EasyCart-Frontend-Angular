import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: any = [];
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getWishListItems()
  }
  getWishListItems() {
    this.api.getWishlistItemsApi().subscribe({
      next: (res: any) => {
        this.wishlistItems = res
        console.log("wishlist items ::::", this.wishlistItems);
      },
      error: (res: any) => {
        console.log(res);
      }
    })
  }
  deleteWishlistItems(productId: any) {
    console.log("product id :::", productId);
    this.api.deleteWishlistItemsApi(productId).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Good job!",
          text: "successfully deleted item from wishlist",
          icon: "success"
        });
        this.getWishListItems()
        //behaviour subject for updating wishlist count in header
        this.api.updateWishlistCount()
      },
      error: (res: any) => {
        Swal.fire({
          title: "Error!",
          text: "sorry,an error in deleting wishlist item",
          icon: "error"
        });
        console.log(res);
      }
    })


  }

  addToCart(product: any) {
    if (sessionStorage.getItem("token")) {

      //for quantity
      Object.assign(product, { quantity: 1 })
      this.api.addToCartApi(product).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: "Good job!",
            text: "successfully added to cart",
            icon: "success"
          });
          this.api.updateCartCount()
        },
        error: (res: any) => {
          Swal.fire({
            title: "Error!",
            text: res.error,
            icon: "error"
          });
        }

      })
    }
    else {
      Swal.fire({
        title: "Error!",
        text: "Please Login!!",
        icon: "error"
      });

    }

  }
}
