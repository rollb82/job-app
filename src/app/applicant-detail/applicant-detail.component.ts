import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Applicant } from '../models/applicant'
import { ApplicantService } from '../services/applicants.service'



@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.css'],
  providers:[
    ApplicantService
  ]
})
export class ApplicantDetailComponent implements OnInit {

  applicant: Applicant;
  schedule = [];
  id: number;
  bookmarkButtonText:string = 'Bookmark'
  favoriteButtonText:string = 'Favorite'

  constructor(
    private route: ActivatedRoute,
    private applicantService: ApplicantService,
    private location: Location
  ) { }

  ngOnInit(): void {
    
    this.route.paramMap
      .switchMap((params: ParamMap) => this.applicantService.getApplicant(+params.get('id')))
      .subscribe((applicant) => {      
        this.applicant = applicant;
        this.bookmarkButtonText = this.isBookmarked(this.applicant.bookmark);
        this.favoriteButtonText = this.isFavorite(this.applicant.favorite);
        this.changeSchedule();  
      });
        
  }

  changeSchedule():any{
    let days = Object.keys(this.applicant.availability).map((key)=>{                  
      return {
        day: key,
        time: this.applicant.availability[key] 
      }    
    });
    this.schedule = days;
  }

  addBookMark():void{
    
    if(this.applicant.bookmark == false){
      this.applicant.bookmark = true;
    }
    else{
      this.applicant.bookmark = false;
      
    }

    this.applicantService.bookmark(this.applicant)
      .then(applicant=>{        
        this.bookmarkButtonText = this.isBookmarked(this.applicant.bookmark);
      });    
  }

  addFavorite():void{
    
    if(this.applicant.favorite == false){
      this.applicant.favorite = true;
    }
    else{
      this.applicant.favorite = false;
      
    }

    this.applicantService.favorite(this.applicant)
      .then(applicant=>{        
        this.favoriteButtonText = this.isFavorite(this.applicant.favorite);
      });    
  }

  isBookmarked(isBookmarked: boolean): string{
    if(isBookmarked == true){
      return 'Remove bookmark'
    }
    else{
      return 'Bookmark'
    }
  }

  isFavorite(isFavorite: boolean): string{
    if(isFavorite == true){
      return 'Remove favorite'
    }
    else{
      return 'Favorite'
    }
  }

  goBack() :void{
    this.location.back();
  }

}
