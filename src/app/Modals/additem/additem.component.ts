import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
})
export class AdditemComponent implements OnInit {
  @Output() addItemEvent = new EventEmitter<string>();
  itemName: string = '';

  addItem() {
    this.addItemEvent.emit(this.itemName);
    this.itemName = '';
  }
  ngOnInit(): void {}
}
