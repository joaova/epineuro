import { DiseaseModel } from './disease-model';

export class PatientModel {
    id: number;
    gender: number;
    color: number;
    civilState: number;
    scholarity: number;
    birthState: string;
    birthCity: string;
    currentCity: string;
    job: number;
    religion: number;
    birthDate: Date;
    startOutpatientFollowUp: Date;
    endOutpatientFollowUp: Date;
    dischargeDate: Date;
    diseaseGroup: number;
    comorbities: DiseaseModel[];  
    bmi: string;
    smoking: number;
    alcoholism: number;
    drugs: string[];
    previousNeurosurgery: string[];
    firstDegreeRelative: DiseaseModel[];
    exams: string[];
    medications: string[];
}