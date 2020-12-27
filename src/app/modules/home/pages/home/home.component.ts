import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor
  (
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private router: Router
  ) 
  {
    iconRegistry.addSvgIcon(
        'brain',
        sanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/brain-icon.svg'));
  }

  public isLoginUrl: boolean = false;
  isNavExtended: boolean = false;

  ngOnInit(): void {
    if(this.router.url == "/login") {
      this.isLoginUrl = true;
    }

    this.router.events.subscribe((param) => {
      if (param instanceof NavigationEnd) {
        if(param.url == "/login") {
          this.isLoginUrl = true;
        } else {
          this.isLoginUrl = false;
        }
      }
    })
  }

  showExtendedNav() {
    if (this.isNavExtended == false) {
      this.isNavExtended = true;
      return;
    }

    this.isNavExtended = false;
  }

}
