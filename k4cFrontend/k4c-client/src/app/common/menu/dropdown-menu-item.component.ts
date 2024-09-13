import {Component, Input} from "@angular/core";

@Component({
  templateUrl: 'dropdown-menu-item.component.html',
  standalone: true,
  selector: 'dropdown-menu-item',
})
export class DropdownMenuItemComponent {

  @Input() text: string = '';
  @Input() icon: string = '';

}
