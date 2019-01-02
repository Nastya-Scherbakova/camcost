import { BuyItem, Item } from "../models/item.model";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { PageViewModel } from "../models/page-view.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ItemsService {
  public isFullListDisplayed: boolean = false;
  public searchString: string;
  public items: Array<Item>;
  public itemsResolver = new Subject<Array<Item>>();
  public parametres: Array<string>;
  private api: ApiService;
  public page: PageViewModel = new PageViewModel();
  private noOfItemsToShowInitially: number = 8;
  constructor(private http: HttpClient) {
    this.parametres = new Array<string>();
    this.items = new Array<Item>();
    this.api = new ApiService(http);
    this.initializeItems();

  }
  public filter() {

    this.api.post('api/Items/Search', this.parametres).subscribe((res: Array<Item>) => {
      this.items = new Array<Item>();
      for (var i = 0; i < this.page.pageSize; i++) {
        this.items[i] = res[i];
      }
      this.itemsResolver.next(this.items);
    })
  }

  public viewChanges(): Observable<Array<Item>> {
    return this.itemsResolver.asObservable();
  }
  public initializeItems() {
    this.api.get('/api/Items').subscribe((res: any) => {
      this.page.totalItems = res.length;
      this.page.pageSize = this.noOfItemsToShowInitially;
      this.page.pageNumber = 1;
      this.page.totalPages = Math.ceil(this.page.totalItems / this.page.pageSize);
      this.items = res;
      this.itemsResolver.next(this.items);
    })
    // this.items=res);

  }

  public search(searchString: string) {
    this.searchString = searchString;
    if (searchString.length > 0) {
      this.api.post('api/Items/Search/' + searchString, this.parametres).subscribe(data => {

        this.items = data;
        this.page.pageNumber = 1;
        this.page.pageSize = this.noOfItemsToShowInitially;
        this.page.totalItems = data.length + 100;
        this.page.totalPages = Math.ceil(this.page.totalItems / this.page.pageSize);

        this.items = new Array<Item>();
        for (var i = 0; i < this.page.pageSize; i++) {

          this.items.push(data[i]);
        }
        this.itemsResolver.next(this.items);
      });
    }
    else this.filter();


  }

  public onScroll() {

    // Update ending position to select more items from the array
    this.page.pageSize += this.noOfItemsToShowInitially;
    let searchMe;
    if (this.searchString && this.searchString.length > 0) searchMe = 'api/Items/Search/' + this.searchString + '?pageNumber=' + this.page.pageNumber;
    else searchMe = 'api/Items/Search/' + '?pageNumber=' + this.page.pageNumber;
    this.page.pageNumber++;
    this.api.post(searchMe, this.parametres).subscribe(data => {
      this.items = data;
      this.itemsResolver.next(this.items);
      this.page.pageSize = this.page.pageNumber * this.noOfItemsToShowInitially;
      this.page.totalItems = data.length;
      this.page.totalPages = Math.ceil(this.page.totalItems / this.page.pageSize);


    });
  }
}