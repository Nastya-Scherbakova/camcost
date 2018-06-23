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
  title: string;
  checked: boolean;
  father: string;
  constructor(title: string, checked: boolean, father: string) {
    this.father = father;
    this.checked = checked;
    this.title = title;

  }
}