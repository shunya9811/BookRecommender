import { Component, OnInit } from '@angular/core';

import { PersonService } from '../person.service';
import { BookService } from '../book.service';

import { Person } from '../models/person';
import { Book } from '../models/book';

@Component({
  selector: 'app-person-input',
  templateUrl: './person-input.component.html',
  styleUrls: ['./person-input.component.css']
})
export class PersonInputComponent implements OnInit {

  person$: Person;
  
  constructor(private personService: PersonService, private bookService: BookService){
    
    // 状況が違うことに注意
    // personの値を操作する必要があるから、値をほしい　
    this.personService.personSubject.subscribe((person: any) => {
      this.person$ = person
    })

    // book、bookListの値は欲しくない　しかしnullにはする必要あるから取得している
    this.bookService.bookSub.subscribe();
    this.bookService.bookListSub.subscribe();
  }

  ngOnInit(): void {
    
  }

  getRandomPerson(): void{
    this.personService.setRandomPerson()
      .subscribe(person => this.person$ = person);

    // listコンポーネントの初期化
    this.bookService.bookListSub.next(null);
    // detailコンポーネントの初期化
    this.bookService.bookSub.next(null);
  }

  onSubmit(){
    // フォームからの値を使用して、サービスの Observable Person を、
    // 指定された Person に設定します
    this.setPerson();

    // book サービス内のおすすめの本のリストを更新するアクションをトリガーする
    this.getBookList();

  }

  setPerson(): void{
    let person = new Person(this.person$.gender, this.person$.country, this.person$.imageURL, this.person$.age); 
    this.personService.setPerson(person);    
  }

  getBookList(){
    this.bookService.updateLocalList(this.person$.getTopic());
  }
}
