import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class DataService {
    
    private _schoolsUrl = 'api/data/schools.json';
    private _termsUrl = 'api/data/terms.json';
    
    constructor(private _http: Http) {
        
    }

    getSchools() {
        return this._http.get(this._schoolsUrl)
            .map((response: Response) => <any[]>response.json())
    }
    
    getTerms() {
        return this._http.get(this._termsUrl)
            .map((response: Response) => <any[]>response.json())
    }
    
}   