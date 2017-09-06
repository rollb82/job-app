import { Injectable } from '@angular/core';
import { Headers,Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Applicant } from '../models/applicant';

@Injectable()
export class ApplicantService{

    private applicantsUrl = 'api/applications';
    private headers = new Headers({'Content-Type': 'application/json'});
    
    constructor(private http: Http){}

    private handleError(error:any) : Promise<any> {
        console.log('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getApplications(): Promise<Applicant[]>{
        return this.http.get(this.applicantsUrl)
            .toPromise()
            .then(response => response.json().data as Applicant[])
            .catch(this.handleError)
    }

    getApplicant(id:number): Promise<Applicant>{
        let url = `${this.applicantsUrl}/${id}`;
        return this.http.get(url)
        .toPromise()
        .then(response=>response.json().data as Applicant)
        .catch(this.handleError)
    }

    bookmark(applicant: Applicant): Promise<Applicant>{
        let id = applicant.id;
        console.log(id);
        let url = `${this.applicantsUrl}/${id}`;        
        return this.http
            .put(url, JSON.stringify(applicant), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    favorite(applicant: Applicant): Promise<Applicant>{
        let id = applicant.id;
        console.log(id);
        let url = `${this.applicantsUrl}/${id}`;        
        return this.http
            .put(url, JSON.stringify(applicant), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    
}