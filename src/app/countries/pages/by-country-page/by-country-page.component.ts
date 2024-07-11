import { Component, inject } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'country-by-county-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  public country: Country[] = [];
  private countriesService = inject(CountriesService);

  searchByContry( term: string): void {
    this.countriesService.searchCountry(term)
      .subscribe(country =>{
        this.country = country
      })
  }

}
