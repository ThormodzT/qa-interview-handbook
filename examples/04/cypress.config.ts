import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "https://dummyjson.com",
    env: {
      testUser: process.env.TEST_USER,
      testPassword: process.env.TEST_PASSWORD
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
