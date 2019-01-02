export class SearchForm {
  women: boolean;
  men: boolean;
  parfume: boolean;
  cosmetics: boolean;
  wash: boolean;
  bodycare: boolean;
  hair: boolean;
  checkboxes: Array<Checkbox> = new Array<Checkbox>();

  constructor(checkboxes: Array<Checkbox>) {
    this.checkboxes = checkboxes;
  }

}
export class Checkbox {
  id: number;
  title: string;
  checked: boolean;
  father: number;
  constructor( id:number, title: string, checked: boolean, father: number) {
    this.id = id;
    this.father = father;
    this.checked = checked;
    this.title = title;

  }
}