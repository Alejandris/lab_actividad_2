import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class RoomserService {
    private apiUrl = 'http://localhost:5000/rooms';

    constructor( private http : HttpClient) { }

    getrooms(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/`);
    }
    getroom(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
    insertroom(room: any) : Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/`, room);
    }

}