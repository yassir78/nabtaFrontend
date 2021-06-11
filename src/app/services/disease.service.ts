import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disease } from '../models/disease';

@Injectable({
  providedIn: 'root',
})
export class DiseaseService {
  readonly API = 'https://nabta.herokuapp.com/nabta';
  constructor(private http: HttpClient) {}
  findAll(): Observable<Disease[]> {
    return this.http.get<Disease[]>(`${this.API}/`);
  }
  save(disease: Disease): Observable<Disease> {
    return this.http.post<Disease>(`${this.API}/`, disease);
  }
  update(disease: Disease): Observable<Disease> {
    return this.http.put<Disease>(`${this.API}/`, disease);
  }
}
