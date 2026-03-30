import {test, expect} from '@playwright/test'

test('API GET Request', async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/posts')
    expect(response.status()).toBe(200)
    const text = await response.text();
    expect(text).toContain('sunt')
    console.log(await response.json());
})

