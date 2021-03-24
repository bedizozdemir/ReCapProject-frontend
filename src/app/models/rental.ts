export interface Rental{
    rentalId?:number;
    customerId:number;
    carId:number;
    brandName?:string;
    firstName?:string;
    lastName?:string;
    rentDate:Date;
    returnDate:Date;
    price:number;
}