import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserService } from './services/user.service';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { User } from './components/models/user';
import { Global } from './global/global';
import { SnackbarService } from './services/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,RouterLinkActive,MatIcon,MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio';
  user?: User | any = null;
  responseMessage:string = '';
  constructor(
    private dialog : MatDialog,
    public authService: UserService,
    private snackbar : SnackbarService
  ){
    this.getUser();
  }

  getUser(){
    this.authService.getUser().subscribe(
      response=>{
        this.user = new User(
          response.name,
          response.email,
          response.contact_number,
          response.country_code,
          response.createdAt,
          response.updatedAt
        );
        
      },err=>{
      });
  }

  signin(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.width="430px";
    dialogconfig.minHeight="200px";
    this.dialog.open(SigninComponent,dialogconfig) 
  }

  signup(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.width="430px";
    dialogconfig.minHeight="200px";
    this.dialog.open(SignupComponent,dialogconfig) 
  }
}

