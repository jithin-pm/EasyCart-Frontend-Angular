import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productDetails: any = []
  //activated route is used for getting id from url
  constructor(private api: ApiService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      const id = res._id
      console.log("id:",id);
      this.getProduct(id)
    })
   
  }
  //fetching product details using id
  getProduct(id:any) {     
    this.api.getProductDetailsApi(id).subscribe({
      next: (res: any) => {
        console.log("product response :",res);       
      },
      error: (res:any) => {
        console.log(res);
      }
    })
  }
  
}
