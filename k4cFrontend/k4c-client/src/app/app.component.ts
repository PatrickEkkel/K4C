import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgbInputDatepicker, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbInputDatepicker],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'k4c-client';


  constructor(private modalService: NgbModal) {
  }
  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
