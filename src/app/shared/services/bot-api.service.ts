import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {url} from "../constants";
import {HarvestOrder} from "../models/harvest-order";

@Injectable({
  providedIn: 'root'
})
export class BotApiService {

  constructor(private http: HttpClient) { }

  public getCurrentConfiguration(): Observable<any> {
    return this.http.get(url.configuration);
  }

  public startHarvesting(order: HarvestOrder): Observable<any>{
    return this.http.post(url.startHarvesting, JSON.stringify(order));
  }
}
