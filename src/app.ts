
import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

( async()=> {
         await main();
        
})()

async function main(){
  const {b:basis, l:limit, s:showTable, n: fileName, d: fileDestination} = yarg;
  //console.log(yarg)
  ServerApp.run({
    basis:basis, 
    limit:limit, 
    showTable: showTable, 
    fileName: fileName, 
    fileDestination: fileDestination
  })
}