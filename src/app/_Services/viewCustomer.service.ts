import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomerAddDto } from "src/_Models/CustomerAddDto";
import { CustomerReadDto } from "src/_Models/CustomerReadDto";

@Injectable({
    providedIn: "root"
})
export class ViewCustomerService {
    baseUrl:string="https://localhost:7277/api/Customer";
    constructor(public http:HttpClient){}
    GetAll(){
        return this.http.get<CustomerReadDto[]>(this.baseUrl);
    }
    GetByID(id:number){
        return this.http.get<CustomerReadDto>(this.baseUrl+'/'+id);
    }
    addCst(cst:CustomerAddDto){
        return this.http.post(this.baseUrl,cst)
    }
    DeleteCst(id:number){
        return this.http.delete(this.baseUrl+'/'+id)
    }
    UpdateCst(){
        
    }
}