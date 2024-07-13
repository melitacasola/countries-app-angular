import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'search-box-component',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit{

  private debouncer: Subject<string> =  new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();
  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(1000)
    )
      .subscribe(value => {
      this.onDebounce.emit(value)

    })
  }

  emitValue(term: string): void {
    this.onValue.emit(term);
  }


  //nuevo metodo para usar DEBOUNCE
  onKeyPress(searchTerm: string){
    // console.log(searchTerm);
    //esperar a que el usuario dje de escribir para realizar la petision
    this.debouncer.next(searchTerm)

  }
}
