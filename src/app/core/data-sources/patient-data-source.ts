import { PatientService } from './../services/patient-service';
import { PatientModel } from './../model/PatientModel';
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';

export class PatientDataSource implements DataSource<PatientModel> {

    private patientSubject = new BehaviorSubject<PatientModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(
        private service: PatientService
    ) {}

    connect(collectionViewer: CollectionViewer): Observable<PatientModel[]> {
        return this.patientSubject.asObservable();
    }
 
    disconnect(collectionViewer: CollectionViewer): void {
        this.patientSubject.complete();
        this.loadingSubject.complete();
    }

    loadPatients() {

        this.loadingSubject.next(true);

        this.service.getAllpatients()
            .subscribe(patients => this.patientSubject.next(patients));
    } 
}