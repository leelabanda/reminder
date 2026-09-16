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
  formatPhoneNumber(mobile: string): string {

  let phone = mobile.replace(/\D/g, '');

  // Indian 10-digit number
  if (phone.length === 10) {
    phone = '91' + phone;
  }

  return phone;
}
sendBirthdayWhatsApp(person: any) {

  if (!person.MobileNumber) {
    alert('Mobile number is not available for ' + person.Name);
    return;
  }

  const message =
    `🎂 Happy Birthday ${person.Name}! 🎉\n` +
    `Wishing you happiness, good health and success. 🎈🎁`;

  const phone = this.formatPhoneNumber(person.MobileNumber);

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    '_blank'
  );
}


sendAnniversaryWhatsApp(person: any) {

  if (!person.MobileNumber) {
    alert('Mobile number is not available for ' + person.Name);
    return;
  }

  const message =
    `💍 Happy Anniversary ${person.Name}! ❤️\n` +
    `Wishing you many more wonderful years together. 🎉`;

  const phone = this.formatPhoneNumber(person.MobileNumber);

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    '_blank'
  );
}
}

