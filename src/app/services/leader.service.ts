import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERSHIP } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  // getLeaders(): Promise<Leader[]> {
  //   return Promise.resolve(LEADERSHIP);
  // }   setTimeout(() => resolve(DISHES), 2000);

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => { setTimeout(() => resolve(LEADERSHIP), 2000) });
  }

  // getFeaturedLeader(): Promise<Leader> {
  //   return Promise.resolve(LEADERSHIP.filter( (leader) => leader.featured )[0]);
  // }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => { setTimeout( () => resolve(LEADERSHIP.filter((leader) => leader.featured )[0]), 2000) });
  }
}
