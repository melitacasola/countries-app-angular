import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';


@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  private routerActive = inject(ActivatedRoute);
  private route = inject(Router)
  private alphaCountry = inject(CountriesService);

  public country? : Country;

  ngOnInit(): void {
    //primero vemos
    // this.routerActive.params
    //   .subscribe(params =>{
    //     console.log(params['id']);

    //   })

    //2) provamos que venga algo
    // this.routerActive.params
    //   .subscribe(({ id }) => {
    //     // console.log({params: id});
    //     // this.alphaCountry.searchCountryByAlphaCode(id)
    //     //   .subscribe(country =>{
    //     //     console.log(country);

    //     //   })
    //     // this.searchContry(id)

    //   })

    //nueva forma
    this.routerActive.params
    .pipe(
      switchMap( ({id}) => this.alphaCountry.searchCountryByAlphaCode(id) )
    )
    .subscribe(country =>{
      // console.log({country});
      if(!country) return this.route.navigateByUrl('')

      // console.log('we hace a country!!!');
      // return
      return this.country = country;


    })
  }

  // searchContry(code: string) {
  //   this.alphaCountry.searchCountryByAlphaCode(code)
  //     .subscribe(country => {
  //       console.log(country);

  //     })
  // }

}
