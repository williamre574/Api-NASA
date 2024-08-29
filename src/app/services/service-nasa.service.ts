import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServiceNasaService {
  private baseUrl = environment.getSearch;
  constructor(private http: HttpClient) {}

  // search(value: any) {
  //   const URL = environment.getSearch;
  //   return this.http.get(URL + value)
  // }
  search(searchTerm: string, yearStart?: number, yearEnd?: number, mediaType?: string) {
    let params = new HttpParams()
      .set('q', searchTerm)
      .set('page', '1')
      .set('media_type', mediaType || 'image,video'); // Default to all media types if none specified

    if (yearStart) {
      params = params.set('year_start', yearStart.toString());
    }
    if (yearEnd) {
      params = params.set('year_end', yearEnd.toString());
    }

    return this.http.get(this.baseUrl, { params });
  }
  getVideoDetails(videoUrl: string) {
    return this.http.get(videoUrl);
  }
  loadFromJson(filePath: string) {
    return this.http.get(filePath);
  }
}
