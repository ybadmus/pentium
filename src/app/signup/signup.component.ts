import { Component, OnInit } from '@angular/core';
import { UserDto } from '../shared/user';
import { FormControl , FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { baseURL } from '../shared/baseUrl';
import { throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  user:UserDto;
  token:any;

  constructor(private router: Router, private http: HttpClient) { }
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.minLength(3)]),
      password: new FormControl('', [Validators.required,Validators.minLength(3)]),
      first_name: new FormControl('', [Validators.required,Validators.minLength(3)]),
      last_name: new FormControl('', [Validators.required,Validators.minLength(3)]),
      phone_number:  new FormControl('', [Validators.required,Validators.minLength(3)])
    });
  }

  onSubmit() {
    this.user = this.signupForm.value;
    console.log(this.user, baseURL);

    this.postUserDetails(this.user).subscribe(resp => {
        this.onSuccess();
        sessionStorage.setItem('auth', resp.auth_token);
      },
      errmess => { 
        this.onError();
        sessionStorage.setItem('auth', null);
      });
  }

  postUserDetails(user: UserDto): Observable<UserDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<UserDto>(baseURL + 'users/signup/', user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  onSuccess() {
    this.signupForm.reset({
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone_number: ''
    });

    this.router.navigate(['/mainfeed']);
  }

  onError() {
    this.router.navigate(['/signup']);
  }

  handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    return throwError(errMsg);
  }

}
