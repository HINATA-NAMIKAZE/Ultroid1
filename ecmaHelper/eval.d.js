const { appendFileSync, truncate } = require('fs');
console.log("Command -> `" + String(process.argv.slice(2)).replace(',', ' ').replace('"', '') + '`');

const evalJs = eval(String(process.argv.slice(2)).replace(',', ' '));

truncate('./ecmaHelper/evalJs.result.d.txt', 0, function() { 
    console.log('File Content Deleted');
}); 

evalJs.stdout.on('data', (data) => {
    appendFileSync('./ecmaHelper/evalJs.result.d.txt', `${data.toString()}\n`, () => {});
})

evalJs.stdout.on('error', (error) => {
    appendFileSync('./ecmaHelper/evalJs.result.d.txt', `${error.message}\n`, () => {});
})
