import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  //pay pal
  public payPalConfig?: IPayPalConfig;
  public makePaymentStatus: boolean = false;

  constructor(private fb: FormBuilder, private route: Router, private api: ApiService) { }
  proceedToPayStatus: boolean = false;
  totalAmountToPay: any = 0;

  checkoutForm = this.fb.group({
    uname: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    appartment: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    place: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pincode: ["", [Validators.required, Validators.pattern('[0-9]*')]]
  })


  deleteCartItems(){
    this.api.emptyCartItemsApi().subscribe({
      next: (res: any) => {
      
        this.api.updateCartCount()
      },
      error: (res: any) => {
      }
    })
  }


  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        alert("payment successfull")
        this.route.navigateByUrl("")
        this.makePaymentStatus = false
        this.proceedToPayStatus = false
        this.deleteCartItems()
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        alert("payment cancelled")

      },
      onError: err => {
        console.log('OnError', err);
       alert("Transaction failed, please try again")
      },
     
    }
  }

  proceedToBuy() {
    if (this.checkoutForm.valid) {
      this.proceedToPayStatus = true
      if (sessionStorage.getItem("grandTotal")) {
        this.totalAmountToPay = sessionStorage.getItem("grandTotal")
      }
    }
    else {
      alert("please fill the form completely")

    }
    console.log("oooop");

  }

  makePayment() {
    this.makePaymentStatus = true;
  }

}
