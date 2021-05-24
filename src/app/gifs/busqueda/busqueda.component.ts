import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  constructor( private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  @ViewChild('txtBuscar')
  txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(value : string){
    
    const valueTxt = this.txtBuscar.nativeElement.value;
   
    if (value.trim().length === 0)
      return;

    this.txtBuscar.nativeElement.value = '';

    this.gifsService.agregaAHistorial(value);
    
  }

}
