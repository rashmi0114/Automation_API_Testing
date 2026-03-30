import {test, expect} from '@playwright/test'

test('API GET Request', async({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/posts')
})