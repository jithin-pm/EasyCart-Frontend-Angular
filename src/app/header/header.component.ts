import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private route:Router, private api:ApiService){}
  loginUserName: any = ""
  wishListItemCount: number = 0;
  cartCount: number=0
  ngOnInit(): void {
    if ((sessionStorage).getItem("username")) {
      this.loginUserName = sessionStorage.getItem("username")
    }
    this.api.wishlistCount.subscribe((res:any)=>{
      this.wishListItemCount = res
    })
    this.api.cartCount.subscribe((res:any)=>{
      this.cartCount = res
    })
  }
  logout(){
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    this.loginUserName = ""
    this.route.navigateByUrl("")
    this.wishListItemCount = 0
    this.cartCount = 0


  }
}
