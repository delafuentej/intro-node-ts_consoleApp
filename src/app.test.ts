import { ServerApp } from "./presentation/server-app";


describe('Test app.ts', ()=> {
    test('it should call ServerApp.run with values', async()=>{
      
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = [
            'node', 'app.ts',
            '-b', '10',
            '-l', '8',
            '-n', 'test-file',
            '-d', 'test-destination',
            '-s'
        ]

       await import('./app');

       expect(serverRunMock).toHaveBeenCalledWith({
        basis:10,
        limit: 8,
        showTable: true,
        fileName: 'test-file',
        fileDestination: 'test-destination'
       })

    });
})