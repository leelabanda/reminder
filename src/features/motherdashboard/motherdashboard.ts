import { Component } from '@angular/core';
import { Person } from '../../model/person';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-motherdashboard',
  imports: [CommonModule],
  templateUrl: './motherdashboard.html',
  styleUrl: './motherdashboard.css',
})
export class Motherdashboard {

  people:Person[] = [];

  upCommingBirthdays:Person[] = [];

  upCommingAnniversaries:Person[] = [];


  ngOnInit(){

    const data = localStorage.getItem('people');

    if(data){
      this.people = JSON.parse(data);
    }

    this.loadUpcommingEvents();
  }


  loadUpcommingEvents(){

    const today = new Date();

    const next10Days:string[] = [];


    for(let i=1; i<=10; i++){

      const d = new Date(today);

      d.setDate(today.getDate()+i);

      next10Days.push(`${d.getDate()}-${d.getMonth()}`);
    }



    this.upCommingBirthdays = this.people.filter(person=>{
      if(person.Relation !== 'M-Friend' && person.Relation !== 'Relation'){
        return false;
      }
      if(!person.DOB){
        return false;
      }
      console.log(
  this.people.map(p => ({
    name: p.Name,
    anniversary: p.Anniversary
  }))
);
      const dob = this.convertDate(person.DOB);
      return next10Days.includes(
        `${dob.getDate()}-${dob.getMonth()}`
      );
    }).sort((a,b)=>{
      return this.convertDate(a.DOB).getTime()-this.convertDate(b.DOB).getTime();
      
    });
    console.log(
  this.upCommingAnniversaries.map(p => ({
    name: p.Name,
    anniversary: p.Anniversary,
    days: this.getDaysUntil(p.Anniversary!)
  }))
);
    //     this.upCommingAnniversaries = this.people.filter(person=>{
    //   if(person.Relation !== 'M-Friend' && person.Relation !== 'Relation'){
    //     return false;
    //   }
    //   if(!person.Anniversary){
    //     return false;
    //   }
    //   const anniversary = this.convertDate(person.Anniversary);
    //   return next10Days.includes(
    //     `${anniversary.getDate()}-${anniversary.getMonth()}`
    //   );
    // }).sort((a,b)=>{
    //   return this.convertDate(a.DOB).getTime()-this.convertDate(b.DOB).getTime();
    // });



this.upCommingBirthdays = this.people
  .filter(person => {

    if (person.Relation !== 'M-Friend' &&
        person.Relation !== 'Relation') {
      return false;
    }

    if (!person.DOB) {
      return false;
    }

    const days = this.getDaysUntil(person.DOB);

    return days > 0 && days <= 10;
  })
  .sort((a, b) =>
    this.getDaysUntil(a.DOB) -
    this.getDaysUntil(b.DOB)
  );


  }
getDaysUntil(dateString: string): number {

  const event = this.convertDate(dateString);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  event.setHours(0, 0, 0, 0);

  // If this year's event has passed, use next year
  if (event.getTime() < today.getTime()) {
    event.setFullYear(today.getFullYear() + 1);
  }

  return Math.floor(
    (event.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
}


  convertDate(value:string):Date{

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];


    const [day, month] = value.split(' ');


    return new Date(
      new Date().getFullYear(),
      months.indexOf(month),
      Number(day)
    );

  }

}