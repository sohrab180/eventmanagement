import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventManagementService {
  private baseUrl = 'http://localhost:3000/api/v1/event-managemnet/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, eventData);
  }

  updateEvent(id: string, eventData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, eventData);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
