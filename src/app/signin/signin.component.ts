import { Component, OnInit } from '@angular/core';
import { LoginDto } from '../shared/login';
import { FormControl , FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { baseURL } from '../shared/baseUrl';
import { throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  signinForm:FormGroup;
  user: LoginDto;
  // token:any;
  isMainFeed: false;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.minLength(3)]),
      password: new FormControl('', [Validators.required,Validators.minLength(3)]),
    });
  }

  onSubmit() {
    this.user = this.signinForm.value;
    console.log(this.user, baseURL);

    this.postUserDetails(this.user).subscribe(resp => {
        this.onSuccess();
        sessionStorage.setItem('auth', resp.auth_token);
      },
      errmess => { 
        sessionStorage.setItem('auth', null); 
        this.onError();
      });
  }

  postUserDetails(user: LoginDto): Observable<LoginDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<LoginDto>(baseURL + 'users/login/', user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  onSuccess() {
    this.signinForm.reset({
      email: '',
      password: '',
    });

    this.router.navigate(['/mainfeed']);
  }

  onError() {
    this.router.navigate(['/signin']);
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
