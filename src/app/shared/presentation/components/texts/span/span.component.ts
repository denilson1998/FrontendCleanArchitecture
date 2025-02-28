import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'jichi-span',
  templateUrl: './span.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SpanComponent {
  @Input() label: string = ''
}
