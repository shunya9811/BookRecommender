import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book$: Book | any;

  constructor(private bookService: BookService){
    this.bookService.bookSub.subscribe((book: any) => {
      this.book$ = book;
    })
  }

  ngOnInit(): void {
  }


}
