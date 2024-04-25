// artists.component.ts

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
artists: any;

  constructor(private http :HttpClient,private sanitizer: DomSanitizer,private formBuilder: FormBuilder){}
    getartist(){
    this.http.get('http://localhost:8080/artist/artists').subscribe((data :any)=>{
        for(let i =0;i<data.length;i++){
          data.photo = this.getImagePathFromApi(data.photo);
        }
        this.category = data;
    });
  }
  getImagePathFromApi(path : any) {
    // Assuming imagePathFromApi is the image path you received from your API
    const imagePathFromApi = path;
  
    // Sanitize the image path
   return this.sanitizer.bypassSecurityTrustUrl("file:\\\\\\" + imagePathFromApi);
  }
  
category :any[]=[];


  ngOnInit(): void {
    this.getartist();
  }

}
