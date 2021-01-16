export enum Sexo {
    Feminino,
    Masculino
}

function getSexo(cod: number): string {

    if(cod == 0) {
        return 'Feminino';
    }

    if(cod == 1) {
        return 'Masculino';
    }

    return null;
}
