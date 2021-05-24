import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from './movie.service';
import { Movie } from './movie.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit,AfterViewInit  {
  mov : Movie[] = [];
  movie : any;
  language: any;
  displayedColumns: string[] = ['title', 'language', 'location', 'listingType', 'imdbRating', 'action'];
  dataSource = new MatTableDataSource<Movie>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: MovieService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getMovies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getMovies() {
    this.apiService.getMovies().subscribe(res =>{  
      this.dataSource.data = res;
      this.mov = res;
      this.language = res.map(item => item.language).filter((value, index, self) => self.indexOf(value) === index);
		});
  }

  public doFilter = (event: any) => {
    this.dataSource.filter = event.target.value.trim().toLocaleLowerCase();
  }

  getMovie(imdbID: string) {
    this.apiService.getMovie(imdbID).subscribe(res =>{  
      this.movie = res;

      const dialogRef = this.dialog.open(DialogBoxComponent, {
        width: 'auto',
        height: 'auto',
        data:this.movie
      });
  
      dialogRef.afterClosed().subscribe(result => {

      });
		});
  }

  GetMovieSearch(language: any): void {
    let lang = language.target.value.trim();
    if(lang == "")
        this.dataSource.data = this.mov;
    else
      this.dataSource.data = this.mov.filter(o => o.language == lang);
  }
}
