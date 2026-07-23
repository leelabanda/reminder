import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../model/person';

@Component({
  selector: 'app-motherdashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motherdashboard.html',
  styleUrl: './motherdashboard.css'
})
export class Motherdashboard {

  people: Person[] = [];

  upCommingBirthdays: Person[] = [];

  upCommingAnniversaries: Person[] = [];

  ngOnInit(): void {

    const data = localStorage.getItem('people');

    if (data) {
      this.people = JSON.parse(data);
    }

    this.loadUpcommingEvents();
  }

  loadUpcommingEvents(): void {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDays = 10;

    // Upcoming Birthdays
    this.upCommingBirthdays = this.people
      .filter(person => {

        const relation = person.Relation?.trim();

        if (relation !== 'M-Friend' && relation !== 'Relation') {
          return false;
        }

        if (!person.DOB) {
          return false;
        }

        const eventDate = this.getUpcomingDate(person.DOB);

        const diffDays =
          (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

        return diffDays >= 1 && diffDays <= maxDays;

      })
      .sort((a, b) =>
        this.getUpcomingDate(a.DOB).getTime() -
        this.getUpcomingDate(b.DOB).getTime()
      );



    // Upcoming Anniversaries
// Upcoming Anniversaries
    this.upCommingAnniversaries = this.people
      .filter(person => {
        const relation = person.Relation?.trim();
        if (relation !== 'M-Friend' && relation !== 'Relation') {
          return false;
        }
        if (!person.Anniversary) {
          return false;
        }
        const eventDate = this.getUpcomingDate(person.Anniversary);
        const diffDays =
          (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays >= 1 && diffDays <= maxDays;
      })
      .sort((a, b) => {
        const dateA = this.getUpcomingDate(a.Anniversary!).getTime();
        const dateB = this.getUpcomingDate(b.Anniversary!).getTime();
        return dateA - dateB; // Ensures proper chronological ordering (e.g., July before August)
      });

  }

getUpcomingDate(value: string): Date {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [day, month] = value.trim().split(' ');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let eventDate = new Date(
      today.getFullYear(),
      months.indexOf(month),
      Number(day)
    );
    eventDate.setHours(0, 0, 0, 0);

    // If the date has already passed this year, look at next year
    if (eventDate.getTime() < today.getTime()) {
      eventDate.setFullYear(today.getFullYear() + 1);
    }

    return eventDate;
  }

}