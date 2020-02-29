const scrape = require('website-scraper');
const PhantomPlugin = require('website-scraper-phantom');

var fs = require('fs'),
    __tempDirname = '/temp',
    path = require('path'),
    filePath = path.join(__tempDirname, '/index.html');

scrape({
    urls: ['http://www.sap.com/belgique/index.html'],
    directory: '/temp/',
    plugins: [new PhantomPlugin()]
}, console.log('Scrape starts. Please wait...'));

function copyThenReplace() {
    try {
        const timeout = setInterval(function () {

            const fileExists = fs.existsSync(filePath);

            console.log('Checking if ', filePath, ', exists : ', fileExists);

            if (fileExists) {
                console.log('Replacing starts...');
                fs.readFile(filePath, 'utf8', function (err, data) {

                    var result = data.replace(/SAP/g, 'Odoo');
                    console.log('Sum of replaced iterations `SAP` to `Odoo` : ', result.search('Odoo'), '\n');
                    console.log('Ctrl + C to exit.');

                    fs.writeFile(filePath, result, 'utf8', function (err) {
                        if (err) {
                            return console.log(err);
                        };
                    });
                });
                clearInterval(timeout);
            }
        }, 20000);
    } catch (e) {
        console.log('Error: ', e);
    }
}

copyThenReplace();