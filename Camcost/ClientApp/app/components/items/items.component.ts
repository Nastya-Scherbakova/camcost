import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from '../../models/item.model';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpResponse, HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http'
import { PageViewModel } from '../../models/page-view.model';
import {DataService} from "../../services/data.service";



@Component({
  selector: 'items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent  {
  public items: Array<Item> = new Array<Item>();
  // public items2: [];
  @Input() parametres:string;
  private noOfItemsToShowInitially: number = 8;
  public page: PageViewModel;
  private itemsToLoad: number = 8;

  public isFullListDisplayed: boolean = false;
  api: ApiService;
  constructor(private http: HttpClient, private dataService:DataService) {
    this.api = new ApiService(http);
    this.initializeItems();
    
   
  }
  public initializeItems() {
    this.api.get('/api/Items').subscribe((res: any) => {
      this.page = res;
      this.page.pageSize = this.noOfItemsToShowInitially;
      this.page.pageNumber = 1;
      this.page.totalPages = Math.ceil(this.page.totalItems/this.page.pageSize);
      
      this.getItems();
    })
    // this.items=res);

  }
  public addUserItem(item: Item) {
    this.dataService.addData(item);
  }
  public filter() {
    console.log("filter");
    this.api.post('api/Items/Search', this.parametres).subscribe((res: Array<Item>) => {
      if(res.length==0) this.items.splice(0);
     else for (var i=0; i < this.page.pageSize; i++) {
        this.items[i] = res[i];
      }
      
    })
  }
    public getItems() {
      console.log(this.page);
    this.api.post('api/Items/Index', this.page).subscribe((res: any) => {
     this.items=res;
      
    })
    // this.items=res);

  }
  onScroll() {
  console.log('scroll');
    if (this.page.pageNumber < this.page.totalPages) {
      // Update ending position to select more items from the array
      this.page.pageSize += this.noOfItemsToShowInitially;
      this.page.pageNumber++;
      this.getItems();
      
   
    } else {
      this.isFullListDisplayed = true;
    }
  }
}
