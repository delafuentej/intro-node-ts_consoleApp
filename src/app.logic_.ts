import { writeFileSync, mkdirSync } from "fs";






for(let basis=1; basis<= 10;basis++){
    let output = '';
    const header = `
============================
    Table x ${basis}
============================\n
`
    for(let i=1; i<=10;i++){
        output += `${basis} x ${i} = ${basis*i}\n`;
    }
    output = header + output;
    console.log(output);
    const outputPath = `outputs`;
    const basisPath = `${outputPath}/table-${basis}`;
    mkdirSync(basisPath, {recursive: true});

    writeFileSync(`${basisPath}/table-${basis}.txt`, output);
    console.log(`File created for table ${basis} in folder ${basisPath}`)      
}





