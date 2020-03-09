import { Component, OnInit } from '@angular/core';
import { ImageDto } from '../shared/images';
import { ImageInfo } from '../shared/imageInfo';
import { throwError } from 'rxjs';
import { baseURL } from '../shared/baseUrl';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-mainfeed',
  templateUrl: './mainfeed.component.html',
  styleUrls: ['./mainfeed.component.css']
})
export class MainfeedComponent implements OnInit {
  images: ImageDto;
  listOfImages: ImageInfo[];
  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllImages().subscribe((data: ImageDto) => {
      this.images = data;
      this.listOfImages = this.images.results;
      console.log(this.listOfImages);
    });
  }

  getAllImages(): Observable<ImageDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + sessionStorage.getItem('auth')
      })
    };

    return this.http.get<ImageDto>(baseURL + 'mainfeed/', httpOptions);
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
