import { Component, OnInit } from '@angular/core';

import { ApplicantService } from '../services/applicants.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    ApplicantService
  ]
})
export class DashboardComponent implements OnInit {

  applications = [];
  filterdApplications = [];
  sortBy: string = '';
  direction: string = ''; 
  search: string = '';

  constructor(
    private applicationService: ApplicantService
  ) { }

  ngOnInit() {
    this.getApplications();    
  }

  getApplications() {
    this.applicationService.getApplications()
    .then((applications)=>
    {
      this.filterdApplications = applications;
      this.applications = applications
      this.sortBy = 'id'
      this.direction = '-';
      console.log(applications);
    })    
  }

  changeSort(property:string, direction:string){       
    this.sortBy = property;
    this.filterdApplications.sort((a,b)=>{      
      if(!isNaN(a[property] && b[property])){
        if(direction == '-'){
          this.direction = '+'
          return b[property] - a[property]
        }
        else if(direction == '+'){
          this.direction = '-'
          return a[property] - b[property]
        }
      }      
    })    
  }

  changeSortString(property:string, direction:string){    
    
    this.sortBy = property;  

    let sortData = ()=>{ return this.filterdApplications.sort((a,b)=>{  
        let nameA = a[property];
        let nameB = b[property];
        if(nameA < nameB){
          return -1
        }
        if(nameA > nameB){
          return 1
        }
        return 0
      });
    }

    if(direction == '+'){
      sortData();
      this.direction = '-'
    }
    else{
      this.direction = '+'
      sortData().reverse();
    }
  }

  filterByName(searchString:string){    
    let remaining = this.applications.filter((data)=>{
      return data.name.toLocaleLowerCase()
      .includes(searchString.toLocaleLowerCase());
    });
    console.log(remaining);
    this.filterdApplications = remaining;
  }

}
