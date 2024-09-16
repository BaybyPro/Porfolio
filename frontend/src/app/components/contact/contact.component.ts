import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { countryCodes, defaultCountry } from '../../global/country_code';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Global } from '../../global/global';
import { ContactService } from '../../services/contact.service';
import { Router, RouterLink } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { UserService } from '../../services/user.service';
import { User } from '../models/user';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatIconModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  formContac: any = FormGroup
  countryCodes = countryCodes;
  defaultCountry = defaultCountry;
  responseMessage: any;
  user?: User | any = null;
  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private snackbar: SnackbarService,
    public authservice: UserService
  ) {
    this.title.setTitle('Portfolio-Contacto')
    this.getUser();
  }


  getUser() {
    this.authservice.getUser().subscribe(
      response => {
        this.user = response
      }, (err) => {

      }
    )
  }

  ngOnInit(): void {
    this.formContac = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(Global.names)]],
      email: [null, [Validators.required, Validators.pattern(Global.emailRegex)]],
      country_code: [null, [Validators.required]],
      contact_number: [null, [Validators.required, Validators.pattern(Global.number)]],
      message: [null, [Validators.required]]
    });

    if (this.authservice.loggedIn()) {
      this.authservice.getUser().subscribe((user) => {
        this.user = user;

        // Asignar los valores del usuario logueado
        this.formContac.patchValue({
          name: this.user.name,
          email: this.user.email,
          country_code: this.user.country_code,
          contact_number: this.user.contact_number
        });

        // Asegurar que los valores son marcados como tocados y sucios
        setTimeout(() => {
          this.formContac.controls['name'].markAsTouched();
          this.formContac.controls['email'].markAsTouched();
          this.formContac.controls['country_code'].markAsTouched();
          this.formContac.controls['contact_number'].markAsTouched();
        }, 0);
      });
    }
  }


  submit() {
    var data = this.formContac.value
    this.contactService.SubmitContact(data).subscribe(
      (response) => {
        this.router.navigate(['/message'])
      },
      (err) => {
        console.log(err)
        if (err.error?.message) {
          this.responseMessage = err.error?.message;
        } else {
          this.responseMessage = Global.genericError;
        }
        this.snackbar.openSnackBar(this.responseMessage, Global.error)
      }
    );
  }


}
