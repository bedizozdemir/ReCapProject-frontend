export interface Payment{
    paymentId?:number;
    customerId:number;
    price:number;
    cardOwner:string;
    creditCardNumber:string;
    expirationDate:string;
    cVV:string;
}