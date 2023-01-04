export class Book{
    title: string | undefined;
    author: string | undefined;
    publisher: string | undefined;
    pubDate: string | undefined;
    isbn: number | undefined;

    constructor(title: string, author: string, publisher: string, pubDate: string, isbn: number){
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.pubDate = pubDate;
        this.isbn = isbn;
    }
}