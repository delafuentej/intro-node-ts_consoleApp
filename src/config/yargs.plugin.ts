import yargs from 'yargs';
import {hideBin} from 'yargs/helpers'

export const yarg = yargs(hideBin(process.argv))
.option('b',{
    alias:'basis',
    type:'number',
    demandOption: true,
    describe: 'multiplication table basis'
})
.option('l',{
    alias:'limit',
    type:'number',
    default:10,
    describe: 'multiplication table limit'
})
.option('s', {
    alias:'show',
    type:'boolean',
    default:false,
    describe: 'show multiplication table'
})
.option('n',{
    alias:'name',
    type:'string',
    default:'multiplication-table',
    describe:'File name'
})
.option('d',{
    alias:'destination',
    type:'string',
    default:'outputs',
    describe:'File destination'
})

.check((argv, options)=>{
    if(argv.b <1) throw 'Error: basis must be greater than 0';
    console.log({argv, options})
   
    return true;
})
.parseSync();