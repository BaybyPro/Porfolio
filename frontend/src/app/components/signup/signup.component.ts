import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import { countryCodes,defaultCountry  } from '../../global/country_code';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Global } from '../../global/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatToolbarModule,MatDialogModule,MatDialogActions,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatButtonModule,MatSelectModule,MatInputModule,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  
  countryCodes = countryCodes;
  responseMessage :string = '';

  signupform:any = FormBuilder
  constructor(private formbuilder:FormBuilder,
    private userService:UserService,
    private snackbar:SnackbarService,
    private router:Router,
    private dialogRef:MatDialogRef<SignupComponent>
  ){

  }

  ngOnInit(): void {
    this.signupform = this.formbuilder.group({
      name:[null,[Validators.required,Validators.pattern(Global.names)]],
      email:[null,[Validators.required,Validators.pattern(Global.emailRegex)]],
      password:[null,[Validators.required,Validators.pattern(Global.names)]],
      contact_number:[null,[Validators.required,Validators.pattern(Global.contacNumberRegex)]],
      country_code:[null,Validators.required]
    });
  }

  submit(){
    var data = this.signupform.value
    this.userService.signup(data).subscribe(
      (response)=>{
        localStorage.setItem('token',response.token)
        this.dialogRef.close();
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
      },(err)=>{
        if(err.error.message){
          this.responseMessage = err.error.message;
        }else{
          this.responseMessage = Global.genericError;
        }
        this.snackbar.openSnackBar(this.responseMessage,"error")
      }
    )
  }
}
