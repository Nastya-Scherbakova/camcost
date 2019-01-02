
export class Item {
  id: number;
  title: string;
  gender: number;
  cathegory: string;
  subcathegories: Array<string>;
  filterValues: Array<string>;
  filterNames: Array<string>;
  country: string;
  about: string;
  firm: string;
  price: number;
  images: Array<Image>;
  salePercent: number;
  optPrice: number;
  optMinCount: number;
  
}

export class Image {
  id: number;
  byteImage: ByteString;
}

export class BuyItem {
  id: number;
  item: Item;
  itemId: number;
  count: number;
  
}