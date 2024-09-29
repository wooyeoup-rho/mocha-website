import { expect } from 'chai';
import puppeteer from 'puppeteer';

describe('Personal Website Tests', () => {
    let browser;
    let page;

    before(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('https://wooyeoup-rho.github.io/website/');
    });

    after(async () => {
        await browser.close();
    })

    it('should load the page and verify the title', async () => {
        const title = await page.title();
        expect(title).to.equal('Document');
    });

    it('should display the correct main heading text', async () => {
        const header = await page.$('h1');
        const headerText = await page.evaluate(element => element.textContent, header);
        expect(headerText).to.equal("Hi, I'm Wooyeoup.");
    });

    it('should display personal photo', async () => {
        const picture = await page.$('.profile-picture');
        const src = await page.evaluate(element => element.getAttribute('src'), picture);
        expect(src).to.include('wooyeoup_rho.jpg');
    });

    it('should navigate to Resume page', async () => {
        await page.click('a[href="./public/resume.html"]');
        await page.waitForSelector('h1');
        const currentUrl = await page.url();
        expect(currentUrl).to.include('/public/resume');
    });
});