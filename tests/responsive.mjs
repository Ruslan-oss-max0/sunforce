import { chromium } from '@playwright/test';
import fs from 'node:fs';
const browser = await chromium.launch({channel:'chrome',headless:true});
const page = await browser.newPage({reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
fs.mkdirSync('qa',{recursive:true});
for(const width of [1920,1440,1280,1024,768,430,390,375,320]){
 await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:5173/');
 await page.locator('h1').waitFor();await page.evaluate(async()=>{await document.fonts.ready;for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,150))}window.scrollTo(0,0)});
 await page.waitForTimeout(800);
 const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
 if(result.overflow||result.brokenImages.length)throw new Error(`${width}: ${JSON.stringify(result)}`);
 const serviceBox=await page.locator('.service-photo').boundingBox();if(serviceBox.width<250)throw new Error('Collapsed service image');
 await page.screenshot({path:`qa/${width}.png`,fullPage:true});console.log(`${width}px: no overflow, all images loaded`);
}
await page.getByRole('button',{name:'Відкрити меню',exact:true}).click();await page.getByRole('dialog',{name:'Навігація'}).waitFor();await page.keyboard.press('Escape');
await page.getByRole('button',{name:'Перманентний макіяж',exact:true}).click();await page.waitForTimeout(650);if(await page.getByRole('button',{name:'Перманентний макіяж',exact:true}).getAttribute('aria-expanded')!=='true')throw new Error('Service selector failed');
await page.getByRole('button',{name:'Відкрити фото: Природна виразність'}).click();await page.getByRole('dialog',{name:'Перегляд галереї'}).waitFor();await page.keyboard.press('ArrowRight');await page.getByRole('button',{name:'Закрити фото'}).click();
if(errors.length)throw new Error(errors.join('\n'));console.log('Navigation, services, gallery, reduced motion and console checks passed');await browser.close();
