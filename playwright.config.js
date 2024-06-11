// @ts-check
const { defineConfig } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './src/tests',
  reporter:[
        ['html']
        ],
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    trace: 'on-first-retry',
  },
});

