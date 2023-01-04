import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

import { Book } from '../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  bookList$: Book[] | any;

  constructor(public bookService: BookService) {
    this.bookService.bookListSub.subscribe((bookList: any) => {
      this.bookList$ = bookList;
    })
  }

  ngOnInit(): void {
    
  }

  /*getBookList(): void{
    this.bookList = this.bookService.getAllLocal();
  }*/

  sendToDetail(index: number): void{
    this.bookService.get(index);
  }
}
