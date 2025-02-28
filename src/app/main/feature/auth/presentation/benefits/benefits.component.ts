import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AtomModule } from '@sitec/sarao';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss'],
  standalone: true,
  imports: [CommonModule, AtomModule]
})
export class BenefitsComponent {


  constructor(private router: Router){}


  goToHome(){
    this.router.navigate(['/'])
  }
}
