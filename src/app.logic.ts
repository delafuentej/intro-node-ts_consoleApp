import { writeFileSync, mkdirSync } from "fs";
import { yarg } from "./config/yargs.plugin";

const {b:basis, l:limit, s:showTable} = yarg;

const outputPath = `outputs`;

    let output = '';
    const header = `
============================
    Table x ${basis}
============================\n
`
    for(let i=1; i<= limit; i++){
        output += `${basis} x ${i} = ${basis*i}\n`;
    }
    output = header + output;
    if( showTable ) {
        console.log(output);
    };
 
    const basisPath = `${outputPath}/table-${basis}`;
    mkdirSync(basisPath, {recursive: true});

    writeFileSync(`${basisPath}/table-${basis}.txt`, output);
    console.log(`File created for table ${basis} in folder ${basisPath}`)      






