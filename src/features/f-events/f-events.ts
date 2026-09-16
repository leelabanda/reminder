import { Component } from '@angular/core';
import { Person } from '../../model/person';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-f-events',
  imports: [CommonModule],
  templateUrl: './f-events.html',
  styleUrl: './f-events.css',
})
export class FEvents {  birthdayToday:Person[]=[];
  anniversaryToday:Person[]=[];
  people:Person[]=[];
  todayDate=new Date();
  ngOnInit(){
    const data=localStorage.getItem('people')
      if(data){
        this.people=JSON.parse(data);
      }
      this.loadTodayEvents();
  }
  loadTodayEvents(){
    const today=new Date();
    // const todayDate=today.toLocaleDateString('en-GB',{
    //   day:'numeric',
    //   month:'long'
    // });
    const todayDate=today.getDate();
    const todaymonth=today.getMonth();
    this.anniversaryToday=this.people.filter(p=>{if(!p.Anniversary)return false;
      const anniversary=this.convertDate(p.Anniversary);
      return((p.Relation === 'Relation' || p.Relation === 'F-Friend')&&anniversary.getDate()===todayDate && anniversary.getMonth()===todaymonth);
    });
    this.birthdayToday=this.people.filter(p=>{if(!p.DOB)return false;
      const dob=this.convertDate(p.DOB);
      return((p.Relation === 'Relation' || p.Relation === 'F-Friend') && dob.getDate()===todayDate && dob.getMonth()===todaymonth);
    });
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
sendBirthdayWhatsApp(person: Person) {

  if (!person.MobileNumber) {
    alert('Phone number not available');
    return;
  }

  // Remove +, spaces, hyphens, etc.
  const phone = person.MobileNumber.replace(/\D/g, '');

  const message =
    `🎂 Happy Birthday ${person.Name}! 🎉\n\n` +
    `Wishing you a wonderful birthday filled with happiness, ` +
    `good health and success. Have a fantastic year ahead! 🎁🎈`;

  const url =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
}


sendAnniversaryWhatsApp(person: Person) {

  if (!person.MobileNumber) {
    alert('Phone number not available');
    return;
  }

  const phone = person.MobileNumber.replace(/\D/g, '');

  const message =
    `💐 Happy Anniversary ${person.Name}! ❤️\n\n` +
    `Wishing you many more wonderful years of love, ` +
    `happiness and togetherness. 💕`;

  const url =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank');
}
}

