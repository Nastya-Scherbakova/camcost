
export class Item {
  id: number;
  title: string;
  gender: number;
  cathegory: string;
  about: string;
  firm: string;
  price: number;
  image: ByteString;
  
}

export class BuyItem {
  id: number;
  item: Item;
  itemId: number;
  count: number;
  
}