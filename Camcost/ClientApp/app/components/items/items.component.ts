import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Item, BuyItem } from '../../models/item.model';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpResponse, HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http'
import { PageViewModel } from '../../models/page-view.model';
import { DataService } from "../../services/data.service";
import { ItemsService } from '../../services/items.service';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  public items: Array<Item> ;
  public itemsInBox: Array<Item>;
  public itemsSubscriber: Subscription;
  // public items2: [];
  public parametres: Array<string> = this.itemsService.parametres;
  private noOfItemsToShowInitially: number = 8;
  public page: PageViewModel = this.itemsService.page;
  private itemsToLoad: number = 8;

  public isFullListDisplayed: boolean = this.itemsService.isFullListDisplayed;
  api: ApiService;
  constructor(private http: HttpClient, private dataService: DataService, private itemsService: ItemsService) {

    this.api = new ApiService(http);
    this.itemsInBox  = this.dataService.getData().map(function (el) {return el.item});
    this.itemsSubscriber = this.itemsService.viewChanges().subscribe(all => {this.items = all});
    //this.items = this.itemsService.items;
  }

  public addUserItem(item: Item) {
    this.itemsInBox.push(item);
    this.dataService.addData(item);
  }

  onScroll() {
    this.itemsService.onScroll();
  
      
    

  }

}
