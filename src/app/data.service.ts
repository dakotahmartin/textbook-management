import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class DataService {
    
    /** 2115938 */
    
    private _schoolsUrl = 'http://192.168.111.36/pro-rest/v1/catalog/divisions;location-id=4497926';
    private _adoptionsByTitleUrl = 'api/data/adoptionsByTitle.json';
    private _authToken = ''
    
    /** I purposly left out the authToken, ask me for it. Also put an alert in ngOnInit to say so. */
    
    
    constructor(private _http: Http) {
        
    }

    headers: any;

    getSchools() {
        this.headers = new Headers();
        this.headers.append('Authorization', this._authToken, 'application/json');
        return this._http.get(this._schoolsUrl, {headers: this.headers})
            .map((response: Response) => <any[]>response.json())
    }
    
    getTerms(url) {
        this.headers = new Headers();
        this.headers.append('Authorization', this._authToken, 'Accept', 'application/json');
        return this._http.get(url, {headers: this.headers})
            .map((response: Response) => <any[]>response.json())
    }
    
    getDepartments(url) {
        this.headers = new Headers();
        this.headers.append('Authorization', this._authToken, 'Accept', 'application/json');
        return this._http.get(url, {headers: this.headers})
            .map((response: Response) => <any[]>response.json())
    }
    
    getAdoptionsByTitle(url) {
        this.headers = new Headers();
        this.headers.append('Authorization', this._authToken, 'Accept', 'application/json');
        return this._http.get(url, {headers: this.headers})
            .map((response: Response) => <any[]>response.json())
    }
    
    getCourses(url) {
        this.headers = new Headers();
        this.headers.append('Authorization', this._authToken, 'Accept', 'application/json');
        return this._http.get(url, {headers: this.headers})
            .map((response: Response) => <any[]>response.json())
    }
    
    getSections(url) {
        this.headers = new Headers();
        this.headers.append('Authorization', this._authToken, 'Accept', 'application/json');
        return this._http.get(url, {headers: this.headers})
            .map((response: Response) => <any[]>response.json())
    }
    
    getTitleCard(url) {
        this.headers = new Headers();
        this.headers.append('Authorization', this._authToken, 'Accept', 'application/json');
        return this._http.get(url, {headers: this.headers})
            .map((response: Response) => <any[]>response.json())
    }
    
}   


