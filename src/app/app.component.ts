import { Component, OnInit } from '@angular/core';
import { AuthService } from './_Services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn = false;
  constructor (private authservice:AuthService){}
  ngOnInit(): void {
    this.authservice.isAuth$.subscribe((value)=>
      (this.isLoggedIn=value.isauth));
      this.authservice.GetData().subscribe(v=>console.log(v));

    this.checkIfUserLoggedIn();  
  }
  checkIfUserLoggedIn() {
    if(localStorage.getItem('Token'))
    {
      this.authservice.isAuth$.next({isauth:true});
    }
  }
}
