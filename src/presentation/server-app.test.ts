import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('Test Server-App', ()=> {
     //as the run method is static, we do not need to create an instance of the class.

     const options = {
        basis: 5,
        limit: 10,
        showTable: false,
        fileName: 'test-fileName',
        fileDestination: 'test-fileDestination',
     }

     beforeEach(()=> {
        jest.clearAllMocks();
     })

    test('it should create ServerApp instance', ()=> {
       
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    })


    test('it should run with custom values mocked', ()=>{

        const logMock = jest.fn();
        // const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue('5 x 1 = 5');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log= logMock;
        // console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server is running...');
    

        expect(createTableMock).toHaveBeenCalledWith({"basis": options.basis, "limit": options.limit});

        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '5 x 1 = 5',
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });

        expect(logMock).toHaveBeenCalledWith('File created!');



    })
    test('it should run ServerApp with options', ()=> {
         //this is a integration test

         const logSpy = jest.spyOn(console, 'log');

         const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');

         const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

     

         ServerApp.run(options);

         expect(logSpy).toHaveBeenCalledTimes(2);
         expect(logSpy).toHaveBeenCalledWith('Server is running...');
         expect(logSpy).toHaveBeenCalledWith('File created!');
         expect(logSpy).toHaveBeenLastCalledWith('File created!');

         expect(createTableSpy).toHaveBeenCalledTimes(1);
         expect(createTableSpy).toHaveBeenCalledWith({
            basis:options.basis,
            limit: options.limit,
         });

         expect(saveFileSpy).toHaveBeenCalledTimes(1);
         expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName,
         });
    })

   
})