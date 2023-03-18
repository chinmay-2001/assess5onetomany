import { Component, OnInit, } from '@angular/core';
import { APIService, Author, Book } from '../API.service'
@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.component.html',
  styleUrls: ['./book-collection.component.css']
})

export class BookCollectionComponent implements OnInit {
  constructor(private api: APIService) { }
  authors: Author[] = []
  authbooks: any = []
  ngOnInit(): void {
    this.api.ListAuthors()
      .then((author) => {
        console.log("authors:", author)
        this.authors = author.items as Author[]
      })
  }

  authorid: string = ''
  authorname: string = ''

  bookid: string = ''
  booktitle: string = ''
  bookgenre: string = ''
  authorbookid: string = ''

  addbook() {
    this.api.CreateBook(
      {
        id: this.bookid,
        title: this.booktitle,
        genre: this.bookgenre,
        authorBooksId: this.authorbookid
      })
      .then(book => {
        let authorid = book.authorBooksId
        for (let i = 0; i < this.authors.length; i++) {
          if (this.authors[i].id === authorid) {
            // this.authors[i].books.items=[...this.authors[i]?.books.items,book]
            this.authors[i].books?.items.push(book as Book)
          }
        }
      })
  }

  SetAuthorIdAccordian(authorid: string) {
    this.add_authorid_at_accordian = authorid
    console.log("add_authorid_at_accordian:", this.add_authorid_at_accordian)
  }
  add_authorid_at_accordian: string = ''
  bookid_at_acc: string = ''
  booktitle_at_acc: string = ''
  bookgenre_at_acc: string = ''

  AddBookAtAccordian() {
    this.api.CreateBook(
      {
        id: this.bookid_at_acc,
        title: this.booktitle_at_acc,
        genre: this.bookgenre_at_acc,
        authorBooksId: this.add_authorid_at_accordian
      })
      .then(book => {
        let authorid = book.authorBooksId
        for (let i = 0; i < this.authors.length; i++) {
          if (this.authors[i].id === authorid) {
            this.authors[i].books?.items.push(book as Book)
          }
        }
      })
  }


  addauthor() {
    this.api.CreateAuthor(
      {
        id: this.authorid,
        name: this.authorname
      })
      .then((data) => {
        console.log("inside createAuthor")
        this.authors = [...this.authors, data]
        console.log(data)
      })
      .catch((err) => {
        console.log("Error Message:", err)
      })
  }

  Deleteauthor(id: string) {
    this.api.DeleteAuthor({ id: id })
      .then((deleted_author) => {
        this.authors = this.authors
          .filter((author) => author.id !== deleted_author.id)
      })
  }

  updatedauthorid: string = ''
  setAuthorid(authorid: string) {
    this.updatedauthorid = authorid
  }
  update_author_name: string = ''
  updateAuthor() {
    this.api.UpdateAuthor({ id: this.updatedauthorid, name: this.update_author_name })
      .then((updated_data) => {
        this.authors = this.authors
          .map((author) => author.id === updated_data.id ? updated_data : author)

      })
  }

  deletebook(id: string, authorid: string) {
    this.api.DeleteBook({ id: id })
      .then((deleted_data) => {
        for (let i = 0; i < this.authors.length; i++) {
          if (this.authors[i].id === deleted_data.author?.id) {
            for (let book = 0; book < this.authors[i].books!.items.length; book++) {
              if (this.authors[i].books?.items[book]?.id == deleted_data.id) {
                this.authors[i].books?.items.splice(book, 1)
              }
            }
          }
        }
      })
  }

  setupdateauthorid: string = ''
  setupdatebookid: string = ''
  setupdateAuthorid(setupdateauthorid: string, setupdatebookid: string) {
    this.setupdateauthorid = setupdateauthorid
    this.setupdatebookid = setupdatebookid
  }
  updatebooktitle: string = ''
  updatebookgenre: string = ''
  updatebookid: string = ''

  updateBook() {
    this.api.UpdateBook({
      id: this.setupdatebookid,
      title: this.updatebooktitle,
      genre: this.updatebookgenre
    })
      .then((updatedbook) => {
        for (let author = 0; author < this.authors.length; author++) {
          if (this.authors[author].id === this.setupdateauthorid) {
            for (let book = 0; book < this.authors[author].books!.items.length; book++) {
              if (this.authors[author].books!.items[book]!.id === updatedbook.id) {
                this.authors[author].books!.items[book]!.genre = updatedbook.genre
                this.authors[author].books!.items[book]!.title = updatedbook.title
              }
            }
          }
        }
      })
  }


}
