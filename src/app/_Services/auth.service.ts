import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{BehaviorSubject, Observable} from 'rxjs';
import { LoginDto } from 'src/_Models/LoginDto';
import { TokenDto } from 'src/_Models/TokenDto';
import { authsate } from 'src/_Models/AuthState';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth$ = new BehaviorSubject<authsate>({isauth:false});

  constructor(private client: HttpClient) { }

  public login (credentials: LoginDto):Observable<TokenDto>{
    return this.client.post<TokenDto>("https://localhost:7277/api/User/Login",credentials);
  }

  public GetData(){
    return this.client.get('https://localhost:7277/api/User')
  }
}