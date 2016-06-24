import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class DataService {
    
    private _schoolsUrl = 'api/data/schools.json';
    private _adoptionsByTitleUrl = 'api/data/adoptionsByTitle.json';
    
    constructor(private _http: Http) {
        
    }

    getSchools() {
        return this._http.get(this._schoolsUrl)
            .map((response: Response) => <any[]>response.json())
    }
    
    getTerms(url) {
        return this._http.get(url)
            .map((response: Response) => <any[]>response.json())
    }
    
    getAdoptionsByTitle() {
        return this._http.get(this._adoptionsByTitleUrl)
            .map((response: Response) => <any[]>response.json())
    }
    
}   