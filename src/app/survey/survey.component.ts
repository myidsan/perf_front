import { Component, OnInit } from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';
import { ResponseForm } from '../model/response-form';
import { CardModalService } from '../service/card-modal.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  res_one: number;
  res_two: number;

  ones = ['Work or school', 'Formal event', 'Casual outing', 'Kickback'];
  twos = ['Aquatic and fruity', 'Floral', 'Spicy', 'Woody'];

  result: ResponseForm;

  constructor(public router: Router,
              public surResult: SurveyResultService,
              public cmService: CardModalService) { }

  submit(res_one, res_two) {
    // this.surResult.get_card(this.res_one, this.res_two);
    // this.router.navigate(['card']);
    // this.cmService.add();
    this.cmService.open(0);
  }

  ngOnInit() {
  }

}
