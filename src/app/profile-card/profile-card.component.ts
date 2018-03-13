import {AfterContentChecked, AfterContentInit, Component, OnInit} from '@angular/core';
import { ScentProfileCard } from '../model/profile-card';
import { SurveyResultService } from '../service/survery-result.service';
import {Subscription} from 'rxjs/Subscription';
import { AsyncPipe } from '@angular/common';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit, AfterContentChecked {

  // Note:
  // Issue with X-XSS-Protection on youtube video
  // related Gitissue: https://github.com/CookPete/react-player/issues/288
  // See comment by 'phpony'

  public card: any;
  public video_URL: string;
  public image_URL: string;

  constructor(public surService: SurveyResultService) { }

  // modify youtube url string to autoplay at given time without control display
  set_youtube_url(url) {
    const re = 'watch?v=';
    url = url.replace(re, 'embed/');
    const processed_url = url + '?start=' + this.card.start_time + '&controls=0&autoplay=1&showinfo=0';
    return processed_url;
  }

  // when a scent profile card is made
  // get the profile card from the service onInit

  ngAfterContentChecked() {
    console.log('profile card after content init');
    this.surService._card.subscribe((val) => {
      this.card = val;
    });
    const url = this.card.video_url;
    this.image_URL = this.card.profile_img_url;
    console.log(this.image_URL);
    this.video_URL = this.set_youtube_url(url);
  }

  ngOnInit() {
    console.log('profile card init');
  }
}