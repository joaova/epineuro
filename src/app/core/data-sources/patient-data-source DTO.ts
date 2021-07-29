import { PatientServiceDTO } from './../services/patient-service DTO';
import { PatientDTO } from './../model/PatientDTO';
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';

export class PatientDataSourceDTO implements DataSource<PatientDTO> {

    private patientSubject = new BehaviorSubject<PatientDTO[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(
        private service: PatientServiceDTO
    ) {}

    connect(collectionViewer: CollectionViewer): Observable<PatientDTO[]> {
        return this.patientSubject.asObservable();
    }
 
    disconnect(collectionViewer: CollectionViewer): void {
        this.patientSubject.complete();
        this.loadingSubject.complete();
    }

    loadPatients(n: number) {

        this.loadingSubject.next(true);

        this.service.getAllpatientsByPag(n)
            .subscribe(patients => this.patientSubject.next(patients));

    } 

    loadPatientsBySame(id: number) {
        this.loadingSubject.next(true);
        this.service.getPatientById(id)
            .subscribe(patients => {
                let pDTO: PatientDTO[] = [];
                pDTO.push(patients);
                this.patientSubject.next(pDTO);
            });
    }

}