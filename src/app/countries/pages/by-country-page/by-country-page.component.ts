import { Component, inject, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'country-by-county-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{
  public country: Country[] = [];
  private countriesService = inject(CountriesService);

  public isLoading: boolean = false;

  ngOnInit(): void {
    this.country = this.countriesService.cacheStore.byCountries.countries;
    // this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByContry( term: string): void {
    this.isLoading = true;
    this.countriesService.searchCountry(term)
      .subscribe(country =>{
        this.country = country;
        this.isLoading = false;
      })
  }

}
