import { Injectable } from '@angular/core';
import { Book } from './models/book';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl: string = "https://openlibrary.org/search.json?q=";
  
  book$: Book | any = null;
  bookList$: Book[] = [];
  
  // Subject
  bookSub: BehaviorSubject<Book | any>
  bookListSub: BehaviorSubject<Book[] | any>

  constructor(private http: HttpClient) {
    this.bookSub = new BehaviorSubject(this.book$);
    this.bookListSub = new BehaviorSubject(this.bookList$);
  }

  updateLocalList(topic: string){
    const options = {params: new HttpParams({fromString: 'observe=body, responseType=json'})}
    // データを得てから表示を制限するより、得るデータの数の制限したほうがいい
    const url = this.bookUrl + topic + '&limit=5';

    this.http.get<Book>(url, options)
      .pipe(
        map((data: any) => data.docs),
        catchError(this.handleError<Book>('getBook'))
      )
      .subscribe((data: any) => this.setBookList(data));
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

  setBookList(data: any): void{
    // 
    let list = [];

    for (let i = 0; i < data.length; i++){
      let book = new Book(
        data[i].title != undefined ? data[i].title : "", 
        data[i].author_name != undefined ? data[i].author_name[0] : "",
        data[i].publisher != undefined ? data[i].publisher[0] : "",
        data[i].publish_date != undefined ? data[i].publish_date[0] : "",
        data[i].isbn != undefined ? data[i].isbn[0] : -1);
      list.push(book);
    }

    this.bookListSub.next(list);

    // bookListが設定されただけなので、bookはnull
    this.bookSub.next(null);
  }

  /*
  getAllLocal(): Book[]{
    return this.bookList$;
  }
  */

  get(index : number): void{
    this.bookListSub.subscribe((bookList: any) => {
      if (bookList != null){
        this.bookSub.next(bookList[index]);
      }
    });
  }
}
