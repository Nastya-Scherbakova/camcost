import {Item} from "../models/item.model";


export class DataService{
 
  private userItems: Array<Item> = new Array();
  public getData(): Array<Item> {
         
    return this.userItems;
  }
  public addData(item: Item){
         
    this.userItems.push(item);
    console.log(this.userItems.length);
  }
}