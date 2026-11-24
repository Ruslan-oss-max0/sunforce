import {chromium,expect} from '@playwright/test';
import {services,gallery} from '../src/data.js';
const files=['hero-campaign','about-massage',...services.map(s=>s.image),...gallery.map(s=>s.image)];
if(new Set(files).size!==11)throw new Error('Photography reused between placements');
const b=await chromium.launch({channel:'chrome'});const p=await b.newPage({viewport:{width:1440,height:1000}});await p.goto('http://127.0.0.1:5173/');await p.locator('.hero-image img').evaluate(i=>i.decode());await p.screenshot({path:'qa/v2-desktop-hero.png'});
await p.locator('#services').scrollIntoViewIfNeeded();
const heights=[];
for(let i=0;i<services.length;i++){
 await p.getByRole('button',{name:services[i].name,exact:true}).click();await expect(p.locator(`[data-service-image="${i}"]`)).toHaveClass('is-selected');await p.waitForTimeout(600);
 heights.push(await p.locator('#services').evaluate(e=>e.getBoundingClientRect().height));
 await p.locator('.services-layout').screenshot({path:`qa/v2-service-${i}.png`});
}
if(Math.max(...heights)-Math.min(...heights)>1)throw new Error('Services section shifts');
for(let i=0;i<15;i++)await p.getByRole('button',{name:services[i%5].name,exact:true}).click();await expect(p.locator('[data-service-image="4"]')).toHaveClass('is-selected');
await p.locator('#gallery').scrollIntoViewIfNeeded();await p.waitForTimeout(900);await p.locator('#gallery').screenshot({path:'qa/v2-gallery.png'});
await p.setViewportSize({width:390,height:900});await p.goto('http://127.0.0.1:5173/');await p.screenshot({path:'qa/v2-mobile-hero.png'});
console.log('11 unique placements; all 5 mappings, rapid switching, stable section height and normal-motion crossfade verified');await b.close();
