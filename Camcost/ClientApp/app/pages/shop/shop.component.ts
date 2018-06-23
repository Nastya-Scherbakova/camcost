import { Component, Input } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from '../../models/item.model';
import {  SearchForm, Checkbox } from '../../models/search-form.model';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpResponse, HttpClientModule} from '@angular/common/http';
import { Http, HttpModule } from '@angular/http'
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { Location} from '@angular/common';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  public api: ApiService;
 

    myControl: FormControl = new FormControl();
  myControl2: FormControl = new FormControl();

  ];
 


    constructor(private http: HttpClient, private location:Location) {
     
    this.api = new ApiService(http);
 
    }

   
}