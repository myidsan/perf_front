import {AfterContentChecked, AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import { SurveyResultService } from '../service/survery-result.service';


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
  show_email = false;
  media_purchase = false;
  public user_email = '';
  button_checker = [false, false, false];
  public show_purchase = false;
  public card: any;
  // public video_URL: string;
  // public image_URL: string;
  public result_cards = [];
  window_width: number;
  window_height: number;

  constructor(public surService: SurveyResultService) { }

  // modify youtube url string to autoplay at given time without control display
  set_youtube_url(url) {
    console.log(url);
    const re = 'watch?v=';
    url = url.replace(re, 'embed/');
    const processed_url = url + '?start=' + this.card[1].start_time + '&controls=0&autoplay=1&showinfo=0';
    return processed_url;
  }

  goto_purchase() {
    if (this.show_email === true && this.user_email !== '') {
      this.surService.send_result(this.result_cards, this.user_email);
      // window.location.href = 'https://www.tryperf.com/shop';
    } else {
      this.show_email = true;
    }
  }

  ngOnChanges() {
  }

  // when a scent profile card is made
  // get the profile card from the service onInit
  // ngAfterContentChecked()

  ngAfterContentChecked() {
    console.log('result page oninit');
    this.surService._card.subscribe((val) => {
      if (val) {
        this.isDataLoaded = true;
        this.card = val;
      }
    });
    if (this.card !== undefined) {
      this.result_cards = this.card;

      const cards = document.getElementsByClassName('cards');
      let i = 0;
      for (i = 0; i < cards.length; i++) {
        (cards[i] as HTMLElement).style.backgroundImage = this.result_cards[i].image_lnk;
      }

      const texts = document.getElementsByClassName('text_intro');
      let j = 0;
      for (j = 0; j < texts.length; j++) {
        (texts[j] as HTMLElement).style.opacity = '1';
      }
    }

    // if (this.button_checker[0] && this.button_checker[1] && this.button_checker[2] && document.body.style.width < '850px') {
    //   this.media_purchase = true;
    //   console.log('media_purchase true');
    //   document.getElementById('media_btn_grp').style.visibility = 'visible';
    //   document.getElementById('media_purchase_btn').style.visibility = 'visible';
    //   document.getElementById('media_email_field').style.visibility = 'visible';
    // }

    if (this.button_checker[0] && this.button_checker[1] && this.button_checker[2]) {
      const p_btns = document.getElementsByClassName('purchase_btn');
      (p_btns[2] as HTMLElement).style.opacity = '1';
      (p_btns[2] as HTMLElement).style.visibility = 'visible';

      const email_input = document.getElementsByClassName('email_holder');
      (email_input[2] as HTMLElement).style.opacity = '1';
      (email_input[2] as HTMLElement).style.visibility = 'visible';
      this.show_purchase = true;

      // if (this.show_email === true) {
      //   const email_input = document.getElementsByClassName('email_holder');
      //   (email_input[2] as HTMLElement).style.opacity = '1';
      //   (email_input[2] as HTMLElement).style.visibility = 'visible';
      // }
    }

    if (document.getElementById('purchase_btn_grp') !== null) {
      console.log('this is logged');
      document.getElementById('purchase_btn').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }

  }

  fireEvent(e, i: number) {
    document.getElementById('hr_' + i).style.opacity = '0';
    document.getElementById('card_name_' + i).style.opacity = '0';
    document.getElementById('card_name_' + i).innerHTML = '';
    document.getElementById('card_desc_' + i).style.opacity = '1';
    document.getElementById('card_desc_' + i).innerHTML = this.result_cards[i].description;
    this.button_checker[i] = true;
  }

  killEvent(e, i: number) {
    document.getElementById('hr_' + i).style.opacity = '1';
    document.getElementById('card_name_' + i).style.opacity = '1';
    document.getElementById('card_name_' + i).innerHTML = this.result_cards[i].name;
    document.getElementById('card_desc_' + i).style.opacity = '0';
    document.getElementById('card_desc_' + i).innerHTML = '';
  }


  ngAfterViewInit() {

  }

  ngOnInit() {
    this.window_width = window.innerWidth;
    this.window_height = window.innerHeight;

    // document.getElementById('row_cards').style.opacity = '0';
    // document.getElementById('row_cards').style.opacity = '1';
  }
}
