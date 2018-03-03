import { Injectable } from '@angular/core';
import { ScentProfileCard } from '../model/profile-card';
import * as _ from 'underscore';

@Injectable()
export class CardModalService {

  private modals: any[] = [];
  private isModalOpen: Boolean;

  constructor() { }

  open(id: number) {
    console.log('card service opened');
    let _open = () => {
      const modal = _.find(this.modals, { id: id });
      console.log(modal);
      modal.open();
      this.isModalOpen = true;
    };
    _open();

  }

  close(id: number) {
    const modal = _.find(this.modals, { id: id });
    modal.close();
    this.isModalOpen = false;
  }

  add(modal: any) {
    this.modals.push(modal);
  }
}
