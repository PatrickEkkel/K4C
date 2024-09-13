import {Component} from "@angular/core";
import {MenuItemComponent} from "./menu-item.component";
import {DropdownMenuItemComponent} from "./dropdown-menu-item.component";

@Component({
  templateUrl: 'menu.component.html',
  standalone: true,
  selector: 'side-menu',
  imports: [
    MenuItemComponent,
    DropdownMenuItemComponent
  ]
})
export class MenuComponent  {

}
