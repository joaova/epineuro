import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor
  (
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
  ) 
  {
    iconRegistry.addSvgIcon(
        'brain',
        sanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/brain-icon.svg'));
    iconRegistry.addSvgIcon(
        'man',
        sanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/man.svg'));
    iconRegistry.addSvgIcon(
        'woman',
        sanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/icons/woman.svg'));
  }
  

  ngOnInit(): void {
  }

}
