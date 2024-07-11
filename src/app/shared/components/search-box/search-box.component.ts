import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'search-box-component',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  emitValue(term: string): void {
    this.onValue.emit(term);
  }
}
