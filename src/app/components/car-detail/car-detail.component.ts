import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages: CarImage[] = [];
  cars: Car[]=[];
  path = "https://localhost:44326/Images/";
  isRented:boolean;

  constructor(private carImageService:CarImageService, private carService:CarService, private activatedRoute: ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getCarDetails(params["id"])
    })
  }
  getCarDetails(carId:number){
    this.carService.getCarsById(carId).subscribe(response =>{
      this.cars = response.data;
    })
  }

  getImagesByCarId(carId: number){
    this.carImageService.getImagesByCarId(carId).subscribe(response =>{
      this.carImages = response.data;
    })
  }
  getImagePath(image:string)
  {
    let newPath = this.path + image;
    return newPath; 
  }
  getRentalPage(isRented:boolean)
  {
    this.isRented = isRented;
    if(this.isRented == false)
    {
      return true;
    }
    else{
      this.toastrService.error("This is a rented car, please select another one.");
      return false;
    }
  }
}