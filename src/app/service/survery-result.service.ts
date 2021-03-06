import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScentProfileCard } from '../model/profile-card';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
// import { router } from '../routes';
import { Router } from '@angular/router';

//// change here for local testing
// const perf_back_api = 'http://127.0.0.1:5000/';
const perf_back_api = 'http://ec2-18-237-88-77.us-west-2.compute.amazonaws.com/';



@Injectable()
export class SurveyResultService {
  // public card: Observable<ScentProfileCard>;
  // private _obs_result = new BehaviorSubject<Observable<ScentProfileCard>>(this.card);
  // public readonly survey_result: Observable<ScentProfileCard> = this._obs_result.asObservable();

  public username = '';

  public card: ScentProfileCard;
  public perfumes: any[];
  public obs_card: Observable<any>;
  public _card = new BehaviorSubject<ScentProfileCard>(this.card);
  public cardStore: {
    cards: ScentProfileCard[];
  };
  private one_options = ['Dreamer', 'Charmer', 'Daredevil', 'Navigator'];
  private two_options = ['Observer', 'Enthusiast', 'Giver', 'Innovator'];
  private three_options = ['Creator', 'Architect', 'Achiever', 'Mediator'];

  constructor(public http: HttpClient,
              public router: Router) {
    this.cardStore = { cards: [] };
    this._card = <BehaviorSubject<ScentProfileCard>>new BehaviorSubject(this.card);
    this.obs_card = this._card.asObservable();
  }

  get_result() {
    return this.obs_card;
  }

  // // old get_card -- for testing
  // get_card(res_one: number, res_two: number, res_three: number, username: string): Observable<any> {
  //   this._card = new BehaviorSubject<ScentProfileCard>(this.card);
  //   console.log('get_card accessed in service');
  //   const object_to_send = JSON.stringify({q1: res_one, q2: res_two, q3: res_three, name: username});
  //   const object_to_send_object = {q1: res_one, q2: res_two, q3: res_three, name: username};
  //
  //   // const cardAPI = 'http://ec2-34-211-205-1.us-west-2.compute.amazonaws.com/quiz/' + res_one + '/' + res_two;
  //   const cardAPI = perf_back_api + 'quiz/' + res_one + '/' + res_two;
  //   console.log(cardAPI);
  //   const obs = this.http.get(cardAPI);
  //   console.log(obs);
  //   obs.subscribe( (response: Response) => {
  //     console.log('in subscribe');
  //     console.log(obs);
  //     const response_data = response['scent_profile'];
  //     console.log(response_data);
  //     this._card.next(response_data);
  //     this.obs_card = this._card.asObservable();
  //   })
  //   return this.obs_card;
  // }

  // new get_card
  get_card(res_one: number, res_two: number, res_three: number, username: string): Observable<any> {
    this._card = new BehaviorSubject<ScentProfileCard>(this.card);
    console.log('get_card accessed in service');

    this.username = username;
    const cardAPI = perf_back_api + 'notbought/mode';
    console.log(cardAPI);
    const obs = this.http.post(cardAPI, {
      q1: this.one_options[res_one],
      q2: this.two_options[res_two],
      q3: this.three_options[res_three],
      name: username
    });
    console.log(obs);
    obs.subscribe( (response: Response) => {
      console.log('in subscribe');
      const response_data = response['response']['Cards'];
      // console.log(response_data);
      this._card.next(response_data);
      this.obs_card = this._card.asObservable();
    })
    return this.obs_card;
  }

  send_result(card_result: any, email: string) {
    console.log('sending the result of bought to db');
    const result = card_result;
    const boughtAPI = perf_back_api + 'bought/mode';
    const obs = this.http.post(boughtAPI, {
      q1: result[0].name,
      q2: result[1].name,
      q3: result[2].name,
      name: this.username,
      email: email,
    });
    console.log('after bought api post');
    console.log(obs);
    obs.subscribe( (response: Response) => {
      console.log('in subscribe');
      const response_data = response['response'];
      // console.log(response_data);
    })
    window.location.href = 'https://www.tryperf.com/shop';
    return obs;
  }
}
