import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = []

  private _tagsHistory: string[] = [];
  private apiKey :      string = 'lfWgUqFDZvwa6CIocCErTWFMgqufLsRN';
  private url:          string = 'https://api.giphy.com/v1/gifs/search'

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get taqHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage()
  }

  searchTag(tag:string):void  {
    if(tag.length ===  0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q', tag)

    this.http.get<SearchResponse>(`${this.url}`,{params})
    .subscribe( (resp) => {
      this.gifList = resp.data
      console.log(this.gifList)
    })
  }

  private saveLocalStorage() : void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void{
    if( localStorage.getItem('history') ){
      this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
      this.searchTag(this._tagsHistory[0]);
    }
  }
}
