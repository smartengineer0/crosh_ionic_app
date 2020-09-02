import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonService } from "../../../../service/common.service";
import { Router } from "@angular/router";
import { LoadingController, NavController } from "@ionic/angular";
  import { IonSlides } from "@ionic/angular";
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  public jobs;
  option = {
    loop: true,
    direction: "vertical",
    slidesPerView: 9,
    initialSlide: 7,
    speed: 400,
  };
  isActiveButton: boolean = false;
  segment = 0;
  @ViewChild("slides") slides: IonSlides;
  constructor(
    private commonService: CommonService,
    public router: Router,
    public loadingController: LoadingController,
    private navCtrl: NavController
  ) {
    this.loadingController
      .create({
        message: "Wait a second...",
      })
      .then((loadingElement) => {
        loadingElement.present();
        var ref = this;
        this.commonService.getJobCategories().subscribe((res) => {
          this.jobs = res.map((e) => {
            return {
              id: e.payload.doc.id,
              name: e.payload.doc.data()["name"],
            };
          });
          ref.loadingController.dismiss();
        });
      });
    // this.commonService.getJobCategories().subscribe((res) => {
    //   this.jobs = res.map((e) => {
    //     return {
    //       id: e.payload.doc.id,
    //       name: e.payload.doc.data()["name"],
    //     };
    //   });
    //   console.log(this.jobs);
    // });
  }
  onSlideChanged() {
    this.slides.getActiveIndex().then((val) => {
      this.segment = val;
      if (val == 16 || val == 10 || val == 14) {
        this.isActiveButton = true;
      } else {
        this.isActiveButton = false;
      }
    });
  }
  ionViewWillEnter() {}
  ngOnInit() {}
  ngAfterViewInit() {}
  onClickMove(type, typeId) {
    localStorage.setItem("jobId", typeId);
    switch (type) {
      case "Commercant": {
        this.router.navigate(["merchant"]);
        break;
      }
      case "Sans emploi": {
        this.router.navigate(["unemployed"]);
        break;
      }
      case "Capital": {
        // this.router.navigate(["job-search"]);
        break;
      }
      case "Longue maladie": {
        this.router.navigate(["illness"]);
        break;
      }
    }
  }
  moveNextStep(segment) {
    switch (segment) {
      case 16:
        this.router.navigate(["merchant"]);
        break;
      case 10:
        this.router.navigate(["unemployed"]);
        break;
      case 14:
        this.router.navigate(["illness"]);
        break;
    }
  }
}
