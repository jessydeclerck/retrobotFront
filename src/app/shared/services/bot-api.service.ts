import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {url} from "../constants";
import {HarvestOrder} from "../models/harvest-order";
import {BotConfiguration} from "../models/bot-configuration";

@Injectable({
  providedIn: 'root'
})
export class BotApiService {

  constructor(private http: HttpClient) { }

  public getCurrentConfiguration(): Observable<BotConfiguration> {
    return this.http.get<BotConfiguration>(url.configuration);
  }

  public startHarvesting(order: HarvestOrder): Observable<any>{
    return this.http.post(url.startHarvesting, JSON.stringify(order));
  }
}
