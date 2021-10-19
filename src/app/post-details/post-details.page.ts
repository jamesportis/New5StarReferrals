import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {

  data;
  url: string = 'https://seetucsonhomes.com/'
  constructor(private route: ActivatedRoute, private router: Router, public http: HttpClient, ) {
    let wpPageURL = this.router.url;
    let idSplit = wpPageURL.split("=");
    let id = idSplit[1];
    console.log(id);
    console.log(idSplit[1]);
    console.log(this.router.url);
    this.getPostDetails(id).subscribe(res => {
      this.data = res;
    });
  }

  getPostDetails(id) {
    const route = this.url + 'wp-json/wp/v2/' + `pages/${id}?_embed`
    return this.http.get(route).pipe(
      map(post => {
        post['media_url'] = post['_embedded']['wp:featuredmedia'][0].source_url;
        console.log(post);
        return post;
      })
    )
  }

  ngOnInit() {
  }

}
