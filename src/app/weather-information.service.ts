import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherInformationService {
  private WeatherInformationApiURL = 'https://api.weather.gov';
  
  constructor(private http: HttpClient) { }
  
  // Define EnumerateWeatherStations method to retrieve list of Weather Stations
  EnumerateWeatherStations(): any {
    return this.http.get(`${this.WeatherInformationApiURL}/stations?limit=100`);
  }
  
  // Define GetCurrentWeatherInfo method to retrieve Current Weather information for selected Weather Station
  GetCurrentWeatherInfo(SelectedStationID: string): any {
    return this.http.get(`${this.WeatherInformationApiURL}/stations/${SelectedStationID}/observations?limit=1`); 
  }
}
