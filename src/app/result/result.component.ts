import {AfterContentChecked, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit, AfterContentChecked, AfterViewInit, OnChanges {

  // Note:
  // Issue with X-XSS-Protection on youtube video
  // related Gitissue: https://github.com/CookPete/react-player/issues/288
  // See comment by 'phpony'

  isDataLoaded = false;
  show_button = false;
  public card: any;
  public video_URL: string;
  public image_URL: string;
  slideIndex = 1;
  public result_cards = [];
  window_width: number;
  window_height: number;

  constructor(public surService: SurveyResultService) { }

  // modify youtube url string to autoplay at given time without control display
  set_youtube_url(url) {
    console.log(url);
    const re = 'watch?v=';
    url = url.replace(re, 'embed/');
    const processed_url = url + '?start=' + this.card[1].start_time + '&controls=0&autoplay=1&showinfo=0&mute=1&modestbranding=1';
    console.log(processed_url);
    return processed_url;
  }

  test_func() {
    console.log('test_func called');
    setTimeout(function() { this.show_next_card(); }, 5000);
  }

  video_full_size() {
    $(document).ready(function(){
      sizeTheVideo();
      $(window).resize(function(){
        sizeTheVideo();
      });
    });

    function sizeTheVideo(){
      // - 1.78 is the aspect ratio of the video
// - This will work if your video is 1920 x 1080
// - To find this value divide the video's native width by the height eg 1920/1080 = 1.78
      let aspectRatio = 1.78;

      let video = $('iframe');
      let videoHeight = video.outerHeight();
      let newWidth = videoHeight*aspectRatio;
      let halfNewWidth = newWidth/2;

      //Define the new width and centrally align the iframe
      video.css({"width":newWidth+"px","left":"50%","margin-left":"-"+halfNewWidth+"px"});
    }
  }


  ngOnChanges() {
    console.log('in ngOnChanges');
    // setInterval(this.show_next_card(), 5000);
  }

  // when a scent profile card is made
  // get the profile card from the service onInit
  // ngAfterContentChecked()

  ngAfterContentChecked() {
    // console.log('profile card init====');
    console.log('result page oninit');
    this.surService._card.subscribe((val) => {
      if (val) {
        this.isDataLoaded = true;
        // this.show_next_card();
        // this.test_func();
      }
      this.card = val;
      console.log(this.card);
      console.log('====' + this.isDataLoaded);

    });
    if (this.card !== undefined) {
      // this.result_cards.push(this.card);
      this.result_cards = this.card;
      for (let i = 0; i < this.result_cards.length; i++) {
        this.result_cards[i].vid_lnk = this.set_youtube_url(this.result_cards[i].vid_lnk);
      }
      console.log(this.result_cards);
    }
    // this.video_URL = this.set_youtube_url(this.result_cards[1].vid_lnk);
    // this.image_URL = this.result_cards[1].image_lnk;
  }

  ngAfterViewInit() {
    // set backdrop
    // document.getElementById('backdrop').style.width = this.window_width.toString() + 'px';
    // document.getElementById('backdrop').style.height = this.window_height.toString() + 'px';
  }

  ngOnInit() {
    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;
  }
}
