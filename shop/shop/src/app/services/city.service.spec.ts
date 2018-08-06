import { TestBed, inject } from '@angular/core/testing';

import { CityServiceService } from './city-service.service';

describe('CityServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityServiceService]
    });
  });

  it('should be created', inject([CityServiceService], (service: CityServiceService) => {
    expect(service).toBeTruthy();
  }));
});
