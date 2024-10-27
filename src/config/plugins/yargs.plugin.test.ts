// import { yarg } from './yargs.plugin';


const runCommand = async(args: string[])=>{
    process.argv = [...process.argv, ...args];
    
    const {yarg} = await import('./yargs.plugin');

    return yarg;
    
}


describe('Test yargs.pluggin.ts', ()=>{
    const originalArgv = process.argv;

    beforeEach(()=>{
        process.argv = originalArgv;
        jest.resetModules()
    })

    test('it should return default values',async()=>{
        //console.log(process.argv)
       const argv = await runCommand(['-b', '5']);

       expect(argv).toEqual(expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: 'multiplication-table',
        d: 'outputs',
      })
    );
       // console.log('argv',argv)
    })

    test('it should return configuration with custom values', async()=>{
        const argv = await runCommand(['-b','4','-l','8','-s','-n','custom-multiplication-table','-d', 'custom-outputs']);

        expect(argv).toEqual(expect.objectContaining({
            b: 4,
            l: 8,
            s: true,
            n: 'custom-multiplication-table',
            d: 'custom-outputs',
        }))


    })
    
})