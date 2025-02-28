import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'j-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input()
  title!: string;
  @Input()
  icon!: string;
  @Input()
  subtitle!: string;
  @Input() showPreview!: boolean;
  constructor() {}
  ngOnInit(): void {}
}
