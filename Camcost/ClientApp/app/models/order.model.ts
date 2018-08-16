import {Item, BuyItem} from "./item.model";


export class Order {
  id: number;
  name: string;
  surname: string;
  middlename: string;
  email: string;
  phone: string;
  payVariant: string;
  deliveryVariant: string;
  takeVariant: string;
  street: string;
  house: string;
  room: string;
  cityCtrl: string;
  postmail: string;
  comment: string;
  sum: number;
  additionalInfo: string;
  isDone: boolean = false;

  items: Array<BuyItem> = new Array();
}