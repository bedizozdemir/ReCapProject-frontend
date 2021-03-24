import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:Rental[]=[];
  dataLoaded=false;
  customers:Customer[]=[];
  customerId:number;
  rentdate:Date;
  returndate:Date;
  rental: Rental;
  isRented:boolean = false;

  @Input() carforrental:Car;
  constructor(private rentalService:RentalService, private customerService:CustomerService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getRentalDetails();
  }
  getRentalDetails(){
    this.rentalService.getRentalDetails().subscribe((response)=>{
      this.rentals=response.data
      this.dataLoaded=true;
    });
  }
  getAllCustomers()
  {
    this.customerService.getCustomerDetails().subscribe(response => {
      this.customers = response.data;
    });
  }


  createRent()
  {
   let rent:Rental = {
     carId: this.carforrental.carId,
     customerId: this.customerId,
     rentDate: this.rentdate,
     returnDate: this.returndate,
     price: this.carforrental.dailyPrice
  };
   this.rental = rent;
   this.isRented = true;
   this.toastrService.success("Your rental request has been received. You are redirected to the payment page.");
  }
}
