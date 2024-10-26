//create de file data
export interface CreateTableUseCase{
    execute: (options: CreateTableOptions)=> string;
};

export interface CreateTableOptions {
    basis: number;
    limit?: number;
};

   
export class CreateTable implements CreateTableUseCase{
    constructor(){
         //DI: Dependency Injection
    };

    execute({basis, limit=10}:CreateTableOptions){
        const header = `
        ============================
            Table x ${basis}
        ============================
        \n
        `
        let output= `${header}`;
        for(let i=1; i<= limit; i++){
            output += `${basis} x ${i} = ${basis*i}\n`; 
        }
        return output;
    }
   
}
