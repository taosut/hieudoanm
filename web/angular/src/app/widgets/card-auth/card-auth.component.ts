import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-auth',
  templateUrl: './card-auth.component.html',
  styleUrls: ['./card-auth.component.scss']
})
export class CardAuthComponent implements OnInit {
  @Input('title') title: string;

  constructor() {}

  ngOnInit(): void {}
}
