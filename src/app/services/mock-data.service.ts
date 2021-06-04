import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor() {}

  data = [
    {
      id: 1001,
      url: 'https://www.google.com',
      time: {
        start: '',
        end: '',
        duration: 0,
      },
      isCheck: false,
    },
    {
      id: 1002,
      url: 'https://app.diagrams.net',
      time: {
        start: '',
        end: '',
        duration: 0,
      },
      isCheck: false,
    },
  ];
}
