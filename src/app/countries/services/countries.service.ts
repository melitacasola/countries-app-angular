import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl:string = 'https://restcountries.com/v3.1'
  private http = inject(HttpClient);

  searchCountryByAlphaCode(code: string): Observable<Country |null>{
    //necesito regresar un unico pais.
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(country => country.length > 0 ? country[0] : null ),
        catchError(error => of (null) )
    )
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of ([]) ),
        delay(1000)
      )
  }

  searchCapital(term: string): Observable<Country[]>{
    //para disparar el observable es necesario hacer el susbcribe.
    // return this.http.get<Country[]>(`${this.apiUrl}/capital/${term}`)
    //le anexamos pipe, un operador fuerte de rxJs

    // return this.http.get<Country[]>(`${this.apiUrl}/capital/${term}`).pipe(
    //   catchError(error => of ([]) )
    // )

    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest(url);
  }

  searchCountry( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest(url);
    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     catchError( () => of([]) )
    //   );
  }

  searchRegion( region: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest(url);
    // return this.http.get<Country[]>( url )
    //   .pipe(
    //     catchError( () => of([]) )
    //   );
  }

}
