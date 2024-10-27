
import { CreateTable } from './create-table.use-case';


describe('CreateTableUseCase', ()=> {
    test('it should create table with default values', ()=> {
        // test that createTable is an instance of our  class CreateTable 
        const createTable = new CreateTable();

        const table = createTable.execute({basis: 7});
        const rows = table.split('\n').length;
      //  console.log('table',table)
        expect(typeof table).toBe('string');
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('7 x 1 = 7');
        expect(table).toContain('7 x 10 = 70');
        expect(rows).toBe(14);
    });

    test('it should create table with custom values', ()=> {
        const createTable = new CreateTable();

        const options = {
            basis: 3,
            limit: 20,

        };

        const table = createTable.execute(options);
       //console.log(table)
        const rows = table.split('\n').length;
        expect(table).toContain('3 x 1 = 3');
        expect(table).toContain('3 x 10 = 30');
        expect(table).toContain('3 x 20 = 60');
        expect(rows).toBe(24);
    })
})
