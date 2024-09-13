import {Component} from "@angular/core";
import {MenuItemComponent} from "./menu-item.component";
import {DropdownMenuItemComponent} from "./dropdown-menu-item.component";
import {TestComponent} from "../../home/test.component";

@Component({
  templateUrl: 'appframe.component.html',
  standalone: true,
  selector: 'appframe',
  imports: [
    MenuItemComponent,
    DropdownMenuItemComponent,
    TestComponent
  ]
})
export class AppframeComponent {

}
