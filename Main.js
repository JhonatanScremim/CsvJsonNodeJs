
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
var fs = require('fs');
const moment = require('moment');
console.log('Iniciando leitura: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
const inicio = new Date().getTime();

readFile('./brasil.csv', 'utf-8', (err, fileContent) => {
    if(err) {
        console.log(err); 
        throw new Error(err);
    }
    console.log('Leitura finalizada: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
    const total = new Date().getTime() - inicio
    console.log('Tempo de leitura: ' + total + ' ms')
    ConvertCsvToJson(fileContent)
    .then(result => { 
        WriteJson(result)
        .then(result => {console.log(result); })
          .catch(error => console.log("Erro ao escrever Json: " + error));
    })
    .catch(error => console.log("Erro ao converter Json: " + error));
});

function ConvertCsvToJson(fileContent){
    const promise = new Promise( (resolve, reject) => { 
        try {
            console.log('Iniciado conversão: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
            const incioConvert = new Date().getTime()
            let data = JSON.stringify(csvjson.toObject(fileContent));    
            console.log('Finalizado conversão: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
            const totalConvert = new Date().getTime() - incioConvert
            console.log('Tempo de conversão: ' + totalConvert + ' ms')
            resolve(data);
        }
        catch (error) {
            reject(error);
        }
    });
    return promise;
}

function WriteJson(data){
    const promise = new Promise( (resolve, reject) => { 
                try {
                    console.log('Iniciado escrita: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"))
                    const inicioEscrita = new Date().getTime()
                    fs.writeFileSync('arquivo.json', data);  
                    console.log('Escrita finalizada: ' + moment().format("YYYY-MM-DD HH:mm:ss.SSS"));
                    const totalEscrita = new Date().getTime() - inicioEscrita
                    console.log('Tempo de escrita: ' + totalEscrita + ' ms')    
                } catch (error) {
                    reject(error);
                    }
                });
    return promise;
}


