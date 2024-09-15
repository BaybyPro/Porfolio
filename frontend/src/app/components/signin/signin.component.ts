import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, PatternValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Global } from '../../global/global';
import { UserService } from '../../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatToolbarModule, MatDialogModule, MatDialogActions, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSelectModule, MatInputModule,],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  signinform: any = FormGroup
  responseMessage: string = ''
  constructor(
    private formbuilder: FormBuilder,
    private authservice: UserService,
    private dialogref: DialogRef<SigninComponent>,
    private snackbar: SnackbarService,
    private router:Router
  ) {

  }
  ngOnInit(): void {
    this.signinform = this.formbuilder.group({
      email: [null, [Validators.required, Validators.pattern(Global.emailRegex)]],
      password: [null, [Validators.required, Validators.pattern(Global.names)]]
    });
  }

  forgotPassword() { }

  submit() {
    let data = this.signinform.value;
    this.authservice.signin(data).subscribe(
      response => {
        localStorage.setItem('token', response.token)
        this.dialogref.close();
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
        
      }, err => {
        if (err.error.message) {
          this.responseMessage = err.error.message
        } else {
          this.responseMessage = Global.genericError
        }
        this.snackbar.openSnackBar(this.responseMessage, 'error');
      });
  }

}
