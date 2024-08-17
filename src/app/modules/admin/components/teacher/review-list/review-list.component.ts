import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Review } from '../../../models/review';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [ScrollingModule,MatIconModule,CommonModule,TitleCasePipe],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent  implements OnChanges  {

  // items: any[] = [];
  @Input() reviews: Review[]=[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reviews'] && changes['reviews'].currentValue) {
      // Safe to use reviews.length
      console.log('Number of reviews:', this.reviews.length);
    } else {
      // Handle undefined or empty array
      console.log('Reviews are undefined or empty');
      this.reviews = []; // Ensure it's an empty array if undefined
    }

  }

}
