import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Person } from './models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private personUrl = 'https://randomuser.me/api/';

  person$: Person = new Person("male", "France", "https://cdn.pixabay.com/photo/2015/06/06/22/38/baby-799956__340.jpg", "0");
  personSubject: BehaviorSubject<Person | any>;

  constructor(private http: HttpClient) {
    this.personSubject = new BehaviorSubject<Person>(this.person$);
  }

  setRandomPerson(): Observable<Person>{
    const options = {params: new HttpParams({fromString: 'observe=body, responseType=json'})}

    return this.http.get<Person>(this.personUrl, options)
      .pipe(
        map((data: any) => new Person(data.results[0].gender, data.results[0].location.country, data.results[0].picture.large, data.results[0].dob.age)),
        catchError(this.handleError<Person>('getPerson'))
      );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   *
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // consoleに出力
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  // サービスの Observable Person を、指定された Person に設定します。
  // ここでも、Subject.next() を使用します
  setPerson(inPerson : Person): void{
    this.personSubject.next(inPerson);
  }
}
