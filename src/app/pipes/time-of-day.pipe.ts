import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'timeOfDay'})
export class TimeOfDayPipe implements PipeTransform {
  

  transform(number:number){
    switch(number){
      case 1:
        return  'Afternoon'
      case 2:
        return  'All day'
      default:
        return 'Morning'
    }
  }
}