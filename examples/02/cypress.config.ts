import { defineConfig } from "cypress";
import * as dotenv from 'dotenv';

dotenv.config()

export default defineConfig({
  e2e: {
    baseUrl: "https://dummyjson.com",
    env: {
      dummyUser: process.env.DUMMY_USER,
      dummyPassword: process.env.DUMMY_PASSWORD,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
