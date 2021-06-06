import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MockDataService } from '../services/mock-data.service';
import { saveAs } from 'file-saver';

interface IData {
  id: number;
  url: string;
  time: {
    start: string;
    end: string;
    duration: number;
  };
  isCheck: boolean;
}

@Component({
  selector: 'app-user-stories',
  templateUrl: './user-stories.component.html',
  styleUrls: ['./user-stories.component.scss'],
})
export class UserStoriesComponent implements OnInit {
  tableHeader = ['', 'ID', 'Website URL', 'Start Time', 'End Time', 'Duration'];
  data: IData[] = [];
  ids: number[] = [];
  url: string = 'https://www.google.com';
  current_url: any;

  constructor(private mockData: MockDataService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.data = this.mockData.data;
    this.reload();
  }

  getId(id: number, check: boolean) {
    if (!check) this.ids = this.ids.filter((res) => res !== id);
    if (check && !this.ids.includes(id)) this.ids = [...this.ids, id];
  }

  action(action: string) {
    let result: any = [];
    this.ids.filter((v) => {
      result = this.data.map((res: IData) => {
        if (v !== res.id) return res;
        if (action === 'start') {
          this.url = res.url;
          this.reload();
        }
        const date = new Date().toLocaleString();
        const time = action === 'start' ? { start: date } : { end: date, duration: this.duration(res.time.start, date) };
        return { ...res, isCheck: false, time: { ...res.time, ...time } };
      });
    });
    this.data = result;
    this.ids = [];
  }

  duration(start: any, end: any) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const duration = endTime - startTime;
    return duration / 1000;
  }

  add() {
    this.data = [...this.data, { url: this.url, id: 1001 + this.data.length, time: { start: '', end: '', duration: 0 }, isCheck: false }];
  }

  saveHtml() {
    const blob = new Blob([this.url], { type: 'text/html' });
    const fileName = this.url.replace(/^https?\:\/\/(www.)?/, '').replace('.com', '');
    saveAs(blob, `${fileName}.html`);
  }

  reload() {
    this.current_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
