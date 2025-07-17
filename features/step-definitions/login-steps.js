import { Given, When, Then } from "@wdio/cucumber-framework";
import extractUrl from "../../pages/extractUrl.js";
import loginPage from "../../pages/loginPage.js";
import config from "../../test-utils/config.js";
import sendRudderEvent from "../../test-utils/rudder-api.js";
import webhook from "../../pages/webhook.js";

Given("Login to Rudderstack", async () => {
  await loginPage.open();
  await browser.pause(10000);
  console.log("Logging in with:", config.validEmail, config.validPassword);
  await loginPage.login(config.validEmail, config.validPassword);
  await loginPage.goToConnections();
});

When("Extract the data plane URL and write key", async function () {
  this.sharedData = this.sharedData || {};
  this.sharedData.dataPlaneUrl = await extractUrl.getDataPlaneUrl();
  this.sharedData.writeKey = await extractUrl.getWriteKey();

  console.log("Data Plane URL:", this.sharedData.dataPlaneUrl);
  console.log("Write Key:", this.sharedData.writeKey);
});

When("Send an event via API", async function () {
  const writeKey = this.sharedData?.writeKey;
  const dataPlaneUrl = this.sharedData?.dataPlaneUrl;

  if (!writeKey || !dataPlaneUrl) {
    console.log("Missing data. Write key or daya plane URL not found.");
    return;
  }

  await sendRudderEvent(writeKey, dataPlaneUrl);
});

Then("See the event delivered in webhook destination", async function () {
  await webhook.goToDestinations();
  await webhook.goToRSWebhook();
  await webhook.goToEventsTab();

  const { deliveredCount, failedCount } = await webhook.getDeliveryCounts();

  console.log(`Delivered Events: ${deliveredCount}`);
  console.log(`Failed Events: ${failedCount}`);
});
