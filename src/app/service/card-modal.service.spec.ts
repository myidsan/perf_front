import { TestBed, inject } from '@angular/core/testing';

import { CardModalService } from './card-modal.service';

describe('CardModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardModalService]
    });
  });

  it('should be created', inject([CardModalService], (service: CardModalService) => {
    expect(service).toBeTruthy();
  }));
});
