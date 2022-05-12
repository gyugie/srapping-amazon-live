const puppeteer = require('puppeteer');

(async () => {
   try {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport( { 'width' : 1024, 'height' : 1600 } );

    await page.goto('https://www.amazon.com/live/', {waitUntil: 'networkidle2'});
    await page.waitForSelector('#live-destination-root');
    await page.click('#live-destination-root > div > div > div:nth-child(2) > div:nth-child(1)');
    const title = await page.evaluate(() => {
        return document.querySelector('#live-destination-root > div > div > div:nth-child(2) > div:nth-child(1) > div.broadcast-module__detailsContainer_1051ure27okUi3rpCarf6c > a > div > div.broadcast-module__broadcastTitle_BjhTh1UCbOcyWO5zDnX8o.broadcast-module__noCursor_2nNmlzHZAHyl_CYN0ZRdqp').textContent;
    });
    const author = await page.evaluate(() => {
        return document.querySelector('#live-destination-root > div > div > div:nth-child(2) > div:nth-child(1) > div.broadcast-module__detailsContainer_1051ure27okUi3rpCarf6c > a > div > div.broadcast-module__channelTitleLink_1zMk1CSKkCi_P3D1MVF8d8.broadcast-module__noCursor_2nNmlzHZAHyl_CYN0ZRdqp').textContent;
    });
    const totalSlider = await page.evaluate(() => {
        return document.querySelectorAll('#live-flagship-root > div > div > div.DesktopISPLayout-module__carouselContainer_1OvKVNELjN0bx_O1osHzGx.DesktopImmersiveExpanded-module__carouselContainer_nhi4eH8nD-38W71D0ETcT > div > div > div').length / 2;
    });

    await sliders(page, totalSlider);

    const productRaws = await page.evaluate( () => {
        const _rows = document.querySelectorAll('#live-flagship-root > div > div > div.DesktopISPLayout-module__carouselContainer_1OvKVNELjN0bx_O1osHzGx.DesktopImmersiveExpanded-module__carouselContainer_nhi4eH8nD-38W71D0ETcT > div > div > div');
        let _products = [];
        _rows.forEach( (div) => {
           
             _products.push({
                 productName: div.querySelector('div > div.elementContainer--3FYwc.flexColumn--2aBPG > div.title--3qM6_.title--X01QH.titleAnchor--2TGNn.doubleLinesTitle--ATRHO')?.textContent,
                 price: div.querySelector('div > div.elementContainer--3FYwc.flexColumn--2aBPG > div.price--13I9-.price--1eqs3 > div')?.textContent,
                 imageUrl: div.querySelector('div > div.imageContainer--14vu8 > div > img')?.getAttribute('src'),
             });
        });
        return _products; 
     });
     console.log({
         title: title,
         author: author,
         products: productRaws
     });
   } catch (error) {
       console.log(error);
   }
})();

async function sliders(page, totalSlider){
    for(var i = 0; i < totalSlider; i++) {
        await page.evaluate(() => {
            document.querySelector('#live-flagship-root > div > div > div.DesktopISPLayout-module__carouselContainer_1OvKVNELjN0bx_O1osHzGx.DesktopImmersiveExpanded-module__carouselContainer_nhi4eH8nD-38W71D0ETcT > div > a.scroll-carousel_carouselControl__Id0y9.scroll-carousel_carouselHorizontalControl__1gDln.scroll-carousel_feedRight__3tG5G').click();
        });
        console.log("click slider :: ", i);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}