import {BuyItem, Item} from "../models/item.model";


export class DataService{
 
  private userItems: Array<BuyItem> = new Array();
  public itemCount: number = 0;


  public getData(): Array<BuyItem> {
    this.userItems = JSON.parse(String(localStorage.getItem("userItems")));
    if (this.userItems == null) this.userItems = Array();
    return this.userItems;
  }
  public addData(item: Item) {
    let buyItem = new BuyItem();
    buyItem.item = item;
    buyItem.itemId = item.id;

 
    buyItem.count = 1;
    this.itemCount += buyItem.count;
    this.userItems.push(buyItem);
    localStorage.setItem("userItems", JSON.stringify(this.userItems));

  }
}