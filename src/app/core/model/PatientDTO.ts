import { Sexo } from './../enums/sexo';
import { DiseaseModel } from './disease-model';

export class PatientDTO {
    id: number;
    gender: Sexo;
    currentCity: string;
    age: number;
    mainDisease: String;   
}