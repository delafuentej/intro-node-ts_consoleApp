import { writeFileSync, mkdirSync } from "fs";

export interface SaveFileUseCase {
    execute:(options: SaveFileOptions) => boolean;
};

export interface SaveFileOptions {
    fileContent: string;
    fileDestination?: string;
    fileName?: string
};

export class SaveFile implements SaveFileUseCase {
    constructor(){
        //DI
    }
    execute( {fileContent, fileDestination = 'outputs', fileName = 'table'}: SaveFileOptions): boolean {
        try{
            mkdirSync(fileDestination, {recursive: true});
            writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
            console.log(`File created for table ${fileName} in folder ${fileDestination}`);
            return true;  

        }catch(error){
            console.log(error);
            return false;
        }
           
    }


}