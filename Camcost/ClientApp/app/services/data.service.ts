import { BuyItem, Item } from "../models/item.model";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";


export class DataService {

  private userItems: Array<BuyItem> = new Array();
  public itemCount: number = 0;

  public countChanger = new Subject<number>();

  constructor() {
    this.userItems = JSON.parse(String(localStorage.getItem("userItems")));
    this.itemCount = 0;
    if (this.userItems) {
       this.userItems.forEach(el =>
      this.itemCount += el.count);
    }
   
  }

  public getData(): Array<BuyItem> {
    this.userItems = JSON.parse(String(localStorage.getItem("userItems")));
    if (this.userItems == null) this.userItems = Array();
    return this.userItems;
  }
  public getCount(): Observable<number> {
    this.itemCount = 0;
    if (this.userItems) {
    this.userItems.forEach(el =>
      this.itemCount += el.count);}
    return this.countChanger.asObservable();
  }

  public changeCount(add: boolean) {
    if (add) this.itemCount++;
    else this.itemCount--;
    this.countChanger.next(this.itemCount);
  }
  public addData(item: Item) {
    let buyItem = new BuyItem();
    buyItem.item = item;
    buyItem.itemId = item.id;


    buyItem.count = 1;
    this.itemCount += buyItem.count;
    this.userItems.push(buyItem);
    localStorage.setItem("userItems", JSON.stringify(this.userItems));
    this.countChanger.next(this.itemCount);
  }
}