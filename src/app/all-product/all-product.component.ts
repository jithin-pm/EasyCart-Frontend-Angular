import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  allProducts: any = []
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getAllProducts()
    //behaviour subject for updating wishlist count in header
    this.api.updateWishlistCount()
  }
  getAllProducts() {
    this.api.getAllProductsApi().subscribe({
      next: (res: any) => {
        console.log("get all products");
        console.log("res::", res);
        this.allProducts = res
      },
      error: (res: any) => {
        console.log(res);
      }
    })
  }
  addToCart(product: any) {
    if (sessionStorage.getItem("token")) {

      //for quantity
      Object.assign(product,{quantity:1})
      
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
    else{
      Swal.fire({
        title: "Error!",
        text: "Please Login!!",
        icon: "error"
      });

    }

  }
  addToWishlist(product: any) {
    if (sessionStorage.getItem("token")) {
      this.api.addToWishlistApi(product).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: "Good job!",
            text: "successfully added to wishlist",
            icon: "success"
          });
          //behaviour subject for updating wishlist count in header
          this.api.updateWishlistCount()
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
        title: "warning!",
        text: "please login",
        icon: "error"
      });
    }

  }


}
