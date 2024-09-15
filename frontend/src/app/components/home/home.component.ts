import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ContactService } from '../../services/contact.service';
import { UserService } from '../../services/user.service';
import { User } from '../models/user';
import { SnackbarService } from '../../services/snackbar.service';
import { Global } from '../../global/global';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public user: any;
  responseMessage :string='';
  constructor(
    private contactService: ContactService,
    private authService: UserService,
    private snackbar:SnackbarService,
    private title:Title
  ){
    this.title.setTitle('Portfolio-Inicio')
    this.user = new User('','',0,'','','',);

  }
  
  ngOnInit(): void {
  }

  

  getCV() {
    this.contactService.getCV().subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV-KevinVictorMamaniMamaniP.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      err => {
        console.log(err);
      }
    );
  }
  
}
