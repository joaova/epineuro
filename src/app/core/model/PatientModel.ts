import { DiseaseModel } from './disease-model';
import { Sexo } from './../enums/sexo';

export class PatientModel {
    id: number;
    gender: Sexo;
    birthDate: Date;
    birthState: string;
    birthCity: string;
    currentCity: string;
    comorbities: DiseaseModel[];  
}