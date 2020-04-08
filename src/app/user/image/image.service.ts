import { Injectable } from '@angular/core';
import {GeneralHttpService} from '../../general/general-http.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ProfileType} from '../profile-type';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends GeneralHttpService {
  urlPhoto = '/upload/photo';

  constructor(protected http: HttpClient) {
    super(http);
  }


  public uploadImage(image: File, profile: any, profileType: string): Observable<Object> {
    const formData = new FormData();

    formData.append('image', image);
    formData.append('id', profile.sub);
    formData.append('email', profile.name);
    formData.append('type', profileType);

    return this.http.post(environment.server + this.urlPhoto, formData);
  }
}
