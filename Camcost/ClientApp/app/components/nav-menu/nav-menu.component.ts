import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@Component({
    selector: 'nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  fillerNav = [{
    id: 1, name:
      'Главная'
  },
  {
    id: 2, name:
      'О нас'
  },
  { id: 3, name: 'Статьи' },
  { id: 4, name: 'Доставка и оплата' },
  { id: 5, name: 'Акции' }

  ];

  smallerNav = [{
    id: 1, name:
    'Парфюмерия', link:'/search/parfumes'
  },
  {
    id: 1, name:
    'Косметика', link: '/search/cosmetics'
    },
  {
    id: 1, name:
    'Средства для стирки', link: '/search/wash'
  },
  {
    id: 1, name:
    'Уход за телом', link: '/search/bodycare'
  },
  {
    id: 1, name:
    'Профессиональная техника для парикмахерских', link: '/search/hair'
  },
  {
    id: 2, name:
      'HIPO �������'
  },
  {
    id: 2, name:
      '����������� ������'
  },
  { id: 3, name: '������������ ������ ��������� �� ����������� �������������' },
  { id: 3, name: '��������� �� ����� � ��������' },
  { id: 4, name: '���������� � ��������� �� ������� ��������' },
  { id: 4, name: '������ exe-�����' },
  { id: 5, name: '����� ����������' },
  { id: 5, name: '��������' }

  ];
  public currentId: number;
    public mainEl: boolean = false;
    public aboutEl: boolean = false;
    public payEl: boolean = false;
    public actionsEl: boolean = false;
    public postsEl: boolean = false;
    public hold: boolean = false;

    public show(el: string) {
      if (el === "main") {
        this.mainEl = true;
        this.currentId = 1;
      }
      if (el === "about") {
        this.aboutEl = true;
        this.currentId = 2;
      }
      if (el === "pay") {
        this.payEl = true;
        this.currentId = 4;
      }
      if (el === "actions") {
        this.actionsEl = true;
        this.currentId = 5;
      }
      if (el === "posts") {
        this.postsEl = true;
        this.currentId = 3;
      }
    }
    public hide(el: string) {
        var those = this;
        setTimeout(function (){
            if (el === "main") if(!those.hold) those.mainEl = false;
            if (el === "about") if (!those.hold) those.aboutEl = false;
            if (el === "pay") if (!those.hold) those.payEl = false;
            if (el === "actions") if (!those.hold) those.actionsEl = false;
            if (el === "posts") if (!those.hold) those.postsEl = false;
    }, 200);
    }

}
