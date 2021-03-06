export const timeout = process.env.SLOWMO ? 30000 : 10000

describe('test delphai search', () => {
    beforeAll(async () => {
        await page.goto('https://app.delphai.com/')
    })

    test('should login', async () => {
        await page.goto('https://app.delphai.com')
        await page.type( '[type=text]', 'delphai_test@delphai.com')
        await page.type('[type=password]', 'delphai123!')
        await page.click('button')
        const selector = await page.waitForSelector('.toolbar-mylist-link')
        expect(selector).toBeTruthy()
    }, timeout)

    test('should search', async () => {
        await page.type('[type=text]', 'gogoro')
        await page.click('.d-component-search-icon')
        const searchResult = await page.waitForSelector('.main-container');
        expect(searchResult).toBeTruthy
    }, timeout)

    test('should open filters', async () => {
        await page.click('[type=button]')
        const searchDropdown = await page.waitForSelector('.filters')
        expect(searchDropdown).toBeTruthy
    }, timeout)

    test('should open dropdown', async () => {
        await page.waitForXPath('//span[@class="ant-select-selection-placeholder"]')
        const elements = await page.$x('//span[@class="ant-select-selection-placeholder"]')
        await elements[0].click()
        const dropdown = await page.waitForXPath('//div[@class="filter-dropdown-option filter-search-bar"]')
        expect(dropdown).toBeTruthy
    }, timeout)

    test('should search in the dropdown', async () => {
        const search = await page.$x('//input[@class="ant-input"]')
        await search[0].type('asia')
        const searchResult = await page.waitForXPath('//span[@class="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-close"]')
        expect(searchResult).toBeTruthy
    }, timeout)

    test('should click on a checkbox', async () => {
        const checkbox = await page.$x('//span[@class="ant-select-tree-checkbox-inner"]')
        await checkbox[0].click()
        const clicked = await page.waitForXPath('//button[@class="ant-btn text-font-style rounded-corners-btn applied-filter-btn ant-btn-default"]')
        expect(clicked).toBeTruthy
    }, timeout)

    test('should save a search result', async () => {
        const saveSearchBtn = await page.$x('//button[@class="ant-btn d-component-button ant-btn-default"]')
        await saveSearchBtn[0].click()
        const msg = await page.waitForXPath('//div[@class="ant-message-notice-content"]')
        await page.setViewport({width:1200,height:1000})
        await page.screenshot({ path: 'result.png' })
        expect(msg).toBeTruthy
    }, timeout)

    test('should click first tab', async () => {
        const taps = await page.$x('//div[@class="ant-tabs-tab-btn"]')
        await taps[1].click()
        await page.waitForXPath('//canvas[@data-zr-dom-id="zr_0"]')
        await page.setViewport({ width:1200, height:1000 })
        await page.screenshot({ path: 'tab1.png' })
    }, timeout)

    test('should click second tab', async () => {
        const taps = await page.$x('//div[@class="ant-tabs-tab-btn"]')
        await taps[2].click()
        await page.waitForXPath('//canvas[@data-zr-dom-id="zr_0"]')
        await page.setViewport({ width:1200, height:1000 })
        await page.screenshot({ path: 'tab2.png' })
    }, timeout)

    test('should click the checkbox', async () => {
        const checkboxes = await page.$x('//input[@class="ant-checkbox-input"]')
        await checkboxes[1].click()
        const button = await page.$x('//button[@class="ant-btn table-title-save-btn ant-btn-default"]')
        const buttonClicked = await button[0].click()
        expect(buttonClicked).toBeTruthy
    }, timeout)

    test('modal should show up', async () => {
        const modal = await page.$x('//div[@class="ant-modal-body"]')
        await page.setViewport({ width:1200, height:1000 })
        await page.screenshot({ path: 'modal.png' })
        expect(modal).toBeTruthy
    }, timeout)

    test('should choose a label', async () => {
        const labels = await page.$x('//div[@class="ant-select-selector"]')
        await labels[1].click()
        const firstLabel = await page.waitForXPath('//div[@class="ant-select-item ant-select-item-option select-dropdown-option ant-select-item-option-active"]')
        await firstLabel[0].click()
        expect(firstLabel).toBeTruthy
    })
})

