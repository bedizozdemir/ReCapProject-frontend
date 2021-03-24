import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpClient } from '@angular/common/http'
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  
  cars:Car[]=[];
  dataLoaded=false;
  brands: Brand[] = [];
  colors: Color[] = [];
  brandId: number;
  colorId: number;
  carFilterText="";

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params['brandId'] && params['colorId']) {
        this.getFilteredCars(params['brandId'], params['colorId']);
      }

      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }

      else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }

      else{
        this.getCars();
      }
    })
  }
  getCars(){
    this.carService.getCars().subscribe((response)=>{
      this.cars=response.data
      this.dataLoaded=true;
    });
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }
  getFilteredCars(brandId: number, colorId: number) {
    this.carService.getFilteredCars(brandId, colorId).subscribe((response) => {
      this.cars = response.data;
      if(this.cars.length == 0)
      {
        this.toastrService.error("There is no match for your search.");
      }
    });
  }
  getSelectedColorId(colorId: number) {
    if(this.colorId == colorId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getSelectedBrandId(brandId: number) {
    if(this.brandId == brandId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
}
