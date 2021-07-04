import { HeadacheService } from './../../core/services/headache.service';
import { HeadacheModel } from './../../core/model/HeadacheModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headache-info',
  templateUrl: './headache-info.component.html',
  styleUrls: ['./headache-info.component.css']
})
export class HeadacheInfoComponent implements OnInit {

  constructor(
    private service: HeadacheService 
  ) { }

  headachePatient: HeadacheModel;

  ngOnInit(): void {
    // this.loadPatient();

  }

  loadPatient(id: number) {
    // this.service.getPatientById(id)
  }

}
