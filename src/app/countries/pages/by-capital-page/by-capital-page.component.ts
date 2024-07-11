import { Component, inject } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  private countriesService = inject(CountriesService);

  public isLoading: boolean = false;

  searchByCapital(term: string): void {
    this.isLoading = true;
    // console.log({term});
    //si no nos suscribimos a ese observable no va a pasar nada.
    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }


}
