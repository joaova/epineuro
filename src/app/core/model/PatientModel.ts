import { Surgery } from './SurgeryModel';
import { Medication } from './MedicationModel';
import { Exam } from './ExamModel';
import { Drug } from './DrugModel';
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
    drugs: Drug[];
    previousNeurosurgery: Surgery[];
    firstDegreeRelative: DiseaseModel[];
    exams: Exam[];
    medications: Medication[];
}