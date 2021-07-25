export enum DiseaseGroup {
    HEADACHE,
    MOVEMENT_DISORDERS,
    EPILEPSY,
    DEMENTIA,
    CEREBROVASCULAR_DISEASE,
    NEUROMUSCULAR_DISEASE   
}

export function getDiseaseGroup(cod: number) {

    let enumList: String[] = ["Cefaleia", "Distúrbios do Movimento", 
    "Epilepsia", "Demências", "Doenças Cerebrovasculares", "Doenças Neuromusculares"];

    if(cod >= 0 && cod < enumList.length) {
        return enumList[cod];
    }

    return null;
    
}