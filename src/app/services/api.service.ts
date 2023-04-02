import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private friendsURL = 'http://universities.hipolabs.com/search'

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getUniversities() {
    return this.httpClient.get<any[]>(this.friendsURL)
  }
}
