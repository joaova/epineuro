import { diseaseGroup } from './diseaseGroup';
import { color } from './color';
import { civilState } from './civilState';
import { scholarity } from './scholarity';
import { Surgery } from './SurgeryModel';
import { Medication } from './MedicationModel';
import { Exam } from './ExamModel';
import { Drug } from './DrugModel';
import { DiseaseModel } from './disease-model';

export class PatientCompleteDTO {
    id: number;
    gender: number;
    color: color;
    civilState: civilState;
    scholarity: scholarity;
    birthState: string;
    birthCity: string;
    currentCity: string;
    job: string;
    birthDate: Date;
    startOutpatientFollowUp: Date;
    endOutpatientFollowUp: Date;
    diseaseGroup: diseaseGroup;
    comorbities: DiseaseModel[];  
    smoking: number;
    alcoholism: number;
    drugs: Drug[];
    previousNeurosurgery: Surgery[];
    firstDegreeRelative: DiseaseModel[];
    exams: Exam[];
    medications: Medication[];
    patientUpdated: Date;
}