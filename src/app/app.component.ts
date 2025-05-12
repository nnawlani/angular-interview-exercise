import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { WeatherInformationService } from './weather-information.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  stations: any[] = [];
  selectedWeatherStation: string = '';
  SelectedStationCurrentTemperature: any;

  // Implementing Dependency Injection by injecting newly defined service
  // instance to the Component via constructor injection
  constructor(private WeatherService: WeatherInformationService) { }

  ngOnInit(): void {
    this.WeatherService.EnumerateWeatherStations().subscribe({
      next: (data) => {
        this.stations = data.features;
      },
      error: (err) => {
        console.error('Failed to retrieve list of  weather stations:', err);
      }
   });
  }

  // Event handler for handling the Weather Station selection event
  onSelectingStation() {
    this.WeatherService.GetCurrentWeatherInfo(this.selectedWeatherStation).subscribe({
      next: (data) => {
        this.SelectedStationCurrentTemperature = '';

        // Checking for edge cases such as any of Feature collection or
        // properties or temperature objects being empty
        if(data.features[0] && data.features[0].properties && data.features[0].properties.temperature)
        {
           this.SelectedStationCurrentTemperature = data.features[0].properties.temperature;
           if(this.SelectedStationCurrentTemperature.value)
           {
              const temperatureUnit = this.SelectedStationCurrentTemperature.unitCode;
              this.SelectedStationCurrentTemperature = `Current Temperature: ${this.SelectedStationCurrentTemperature.value} ${temperatureUnit.substr(8)}`
           } else {
             this.SelectedStationCurrentTemperature = 'Current temperature not available for the selected station.'
           }
        } else {
           this.SelectedStationCurrentTemperature = 'Current temperature not available for the selected station.'
        }
      },
      error: (err) => {
        console.error('Failed to retrieve current temperature:', err);
      }
    });
  }
}
