import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { CardModalService } from '../../service/card-modal.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit, OnDestroy {

  id: number;
  private element;
  private type: string;

  constructor(private el: ElementRef,
              private modalSerivce: CardModalService) {
    this.element = $(this.el.nativeElement);
  }

  open() {
    this.element.show();
  }

  close() {
    this.element.hide();
  }

  ngOnInit() {
    this.element.appendTo('.container');
    this.modalSerivce.add(this);
    this.id = 0;
  }

  ngOnDestroy() {
    this.element.remove();
    // this.modalSerivce.add(this);

  }

}
