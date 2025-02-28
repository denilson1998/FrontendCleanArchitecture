import { CommonModule } from '@angular/common';
import {  Component, Input } from '@angular/core';

@Component({
  selector: 'jichi-section-subtitle',
  templateUrl: './section-subtitle.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SectionSubtitleComponent {
  @Input() label: string = '';
}
