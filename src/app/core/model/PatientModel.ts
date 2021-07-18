import { DiseaseModel } from './disease-model';
import { Sexo } from './../enums/sexo';
import { DiseaseGroup } from '../enums/DiseaseGroup';

export class PatientModel {
    id: number;
    gender: Sexo;
    birthDate: Date;
    birthState: string;
    birthCity: string;
    currentCity: string;
    diseaseGroup: DiseaseGroup;
    comorbities: DiseaseModel[];  
}