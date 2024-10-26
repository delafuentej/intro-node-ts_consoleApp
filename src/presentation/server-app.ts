import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    basis: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

export class ServerApp {
    static run({basis, limit,showTable, fileName, fileDestination}: RunOptions){
        console.log('Server is running...');

       const table = new CreateTable().execute({basis, limit});

       const fileCreated = new SaveFile().execute({
        fileContent: table,
        fileDestination: fileDestination,
        fileName: fileName,
    
    })
       if(showTable) console.log(table);
       (fileCreated) ? 
       console.log(`File name:${fileName} was created in folder:${fileDestination}!`)
       : 
       console.log('File could not be created');
    }
}