import { SaveFile } from './save-file.use-case';
import { existsSync, readFileSync, rmSync } from 'fs';

import fs from 'fs';

describe('SaveFileUseCase', ()=> {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    };

    const customFilePath =`${customOptions.fileDestination}/${customOptions.fileName}.txt`

//    beforeEach(()=> {
//         jest.clearAllMocks();
//    })

    afterEach(()=> {
        const existsOutputFolder= existsSync('outputs');
        const existsCustomOutputFolder = existsSync(customOptions.fileDestination)

        if(existsOutputFolder) rmSync('outputs', {recursive: true});
        if(existsCustomOutputFolder)  rmSync(customOptions.fileDestination, {recursive: true});
    })


    test('it should save file with default values', ()=> {
       const saveFile = new SaveFile();
       const filePath = 'outputs/table.txt'
       const options = {
        fileContent: 'test content'
       }

       const result = saveFile.execute(options);
       const fileExists = existsSync(filePath);
       const fileContent = readFileSync(filePath, { encoding:'utf-8'})
        
       expect(result).toBe(true);
       expect(fileExists).toBe(true);
       expect(fileContent).toBe(options.fileContent);
    });

    test('it should save file with custom values', ()=> {
        const saveFile = new SaveFile();
       
        const result = saveFile.execute(customOptions);
        const fileExists = existsSync(customFilePath);
        const fileContent = readFileSync(customFilePath, { encoding:'utf-8'});

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('it should return false if directory could not be created', ()=>{
        // when  mkdirSync()  failed
        
        const saveFile = new SaveFile();
        //create a spy on mkdirSync => fictional implementation
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(()=>{
            throw new Error('This is a custom error message from testing');
        });
          
        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);

        mkdirSpy.mockRestore();
       
});

test('it should return false if file could not be created', ()=>{
    // when  writeFileSync() failed
    
    const saveFile = new SaveFile();
   // create a spy on writeFileSync => fictional implementation
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(()=>{
        throw new Error('This is a custom writting error message from testing');
    }); 

    const result = saveFile.execute({fileContent: 'file content'});

    expect(result).toBe(false);

    writeFileSpy.mockRestore();
   
});

});
