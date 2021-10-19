import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-professional-services',
  templateUrl: './professional-services.page.html',
  styleUrls: ['./professional-services.page.scss'],
})
export class ProfessionalServicesPage implements OnInit {

  url: string = 'https://seetucsonhomes.com/'
  items: any = []
  page: any = 1;
  constructor(
    public http: HttpClient,
    public Router: Router,
    public toastCtrl: ToastController,
    public loadingController: LoadingController
  ) {

    this.loadPost(this.url, this.page, true);
  }
  async loadPost(url: string, page, showLoading) {
    const loading = await this.loadingController.create({
      message: 'Loading Your Referrals'
    });
    if (showLoading) {
      await loading.present();
    }

    const route = this.url + 'wp-json/wp/v2/pages/?categories=1763&per_page=50&orderby=title&order=asc&_embed'
    // set pagination
    if (!page) {
      page = '1';
    }

    return new Promise((resolve, reject) => {

      var concat;

      // check if url already has a query param
      if (url.indexOf('?') > 0) {
        concat = '&';
      } else {
        concat = '?';
      }

      this.http.get(route)
        .subscribe(data => {

          if (showLoading) {
            loading.dismiss();
          }
          this.items = data;
          console.log(this.items);
          resolve(this.items);
        },
          error => {
            if (showLoading) {
              loading.dismiss();
            }
            reject(error);
            this.presentToast(error.error.message)
          })
    });
  }
  doRefresh(event) {
    this.loadPost(this.url, 1, false).then(() => {
      event.target.complete()
    }).catch(() => {
      event.target.complete()
    });
  }

  loadMore(event) {

    this.page++;

    this.loadPost(this.url, this.page, false).then(() => {
      event.target.complete()
    }).catch(() => {
      event.target.complete()
    });

  }
  async presentToast(msg) {

    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      cssClass: 'normal-toast'
    });

    toast.present();

  }

  goToPostDetails(post){
    let navigationExtras: any = {
      queryParams: {
        special: JSON.stringify(post)
      }
    };
    this.Router.navigate(['./post-details'], navigationExtras);
  }

  ngOnInit() {
  }

}
