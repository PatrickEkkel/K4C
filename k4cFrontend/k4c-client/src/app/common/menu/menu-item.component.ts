import {Component, Input} from "@angular/core";

@Component({
  templateUrl: 'menu-item.component.html',
  standalone: true,
  selector: 'menu-item',
})
export class MenuItemComponent {
  @Input() text: string = '';
  @Input() icon: string = '';
}
