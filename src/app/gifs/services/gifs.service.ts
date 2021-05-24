import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private limit: number = 10;
  private url = `https://api.giphy.com/v1/gifs/search?`

  private apiKey: string = 'bCEvlhqahDLLy3qdEGiCGK0WIUDd41gt';
  private _historial: string[] = [];

  //TODO: cambiar any por 'type'
  public resultados : any[] = []; 

  get historial(): string[] {

    return [...this._historial]
  }

  private createUrl(pattern: string, limit: number = this.limit): string {
    return `${this.url}q=${pattern}&limit=${limit}&api_key=${this.apiKey}`
  }

  private sanitizaData(value:string):string
  {
    value = value.trim().toLocaleLowerCase()
    if (!this._historial.includes(value)) {
      this._historial.unshift(value);
      this._historial = this._historial.splice(0, 10);
    }

    return value;
  }

  agregaAHistorial(value: string) {

    value = this.sanitizaData(value)

    const url = this.createUrl(value)

    this.httpClient.get(url).subscribe(
      (resp: any) => {
        console.log(resp.data);
        this.resultados = resp.data       

      }
    )

  }

  constructor(private httpClient: HttpClient) { }
}
