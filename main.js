var selectAnswerCount = 15;
var questions = [];

const startBotFunction = async (question) => {

    const options = {width: 1080, height: 720};
    const config = {
        url : 'https://www.google.com/'
    };
    
    let puppeteer = require('puppeteer-extra');
    require('events').EventEmitter.defaultMaxListeners = 25

    let browsers = await puppeteer.launch({args: [`--window-size=${options.width},${options.height}`,'--no-sandbox', '--allow-running-insecure-content' ], headless : false});
    
    let page = ( await browsers.pages())[0];
    await page.setViewport({width: options.width, height: options.height});
    await page.setDefaultNavigationTimeout(0);
    
    try {
        await page.goto(config.url, {waitUntil: 'load'});
        await page.waitForSelector('.gLFyf');
        await page.type(".gLFyf", question);
        await Promise.all([
            page.keyboard.press(String.fromCharCode(13)),
            page.waitForNavigation(),
        ]);
        let divsCounts = 0;
        while(true){
            divsCounts = await page.$$eval('.ifM9O>div>.ygGdYd', (divs) => divs.length);
            if(divsCounts == 0) break;
            else {
                if(divsCounts < selectAnswerCount) {
                    const list = await page.$$('.ifM9O>div>.ygGdYd');
                    const length = list.length;
                    await list[length - 1].click();
                    await page.waitForTimeout(1000);
                } else {
                    break;
                }
            }
        }
        if(divsCounts == 0){

        }else {
            const question_headers = await page.$$('.cbphWd');
            let header_htmls = [];
            for(var i = 0; i< question_headers.length; i++){
                header_htmls[i] = await question_headers[i].evaluate(el => el.innerTEXT);
            }
            console.log(header_htmls);
        }        

    } catch (err) {
        console.log( err );
    }
}

var fs  = require("fs");
var array = fs.readFileSync('./questions.txt').toString().split('\r\n');

array.forEach(question => {
    startBotFunction( question );
})
