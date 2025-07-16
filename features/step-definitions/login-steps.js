const { Given, When, Then } = require("@wdio/cucumber-framework");
require("dotenv").config();

Given("Login to Rudderstack", async () => {
  await browser.url("https://app.rudderstack.com/login");

  const emailInput = await $('input[type="email"]');
  await emailInput.setValue(process.env.EMAIL);

  const passwordInput = await $('input[type="password"]');
  await passwordInput.waitForExist({ timeout: 5000 });
  await passwordInput.setValue(process.env.PASSWORD);

  const loginButton = await $('button[type="button"]');
  await loginButton.click();
  // await browser.debug();
  await browser.pause(5000);

  const connectionsNav = await $(
    'a[href="/"][data-testid="sub-menu-connections"]'
  );
  // have to manually click on i'll do it later popup and go to Dashboard button as page not coming when logging manually
  await connectionsNav.waitForDisplayed({ timeout: 100000 });
  await connectionsNav.click();
});

When("Extract the data plane URL and write key", async () => {
  const dataPlaneElement = await $("span.text-ellipsis");
  // await dataPlaneElement.waitForExist({ timeout: 5000 });
  const dataPlaneUrl = await dataPlaneElement.getText();

  console.log("Data Plane URL:", dataPlaneUrl);
  this.sharedData = this.sharedData || {};
  this.sharedData.dataPlaneUrl = dataPlaneUrl;

  const allSpans = await $$("span.text-ellipsis");
  let writeKey = "";

  for (const el of allSpans) {
    const text = await el.getText();
    if (text.startsWith("Write key")) {
      writeKey = text.replace("Write key ", "").trim();
      break;
    }
  }

  if (!writeKey) {
    throw new Error("Write Key not found on the page.");
  }

  console.log("Write Key:", writeKey);
  this.sharedData.writeKey = writeKey;
});

When("Send an event via API", async () => {
  const { sendRudderEvent } = require("../../test-utils/rudder-api");

  const writeKey = this.sharedData?.writeKey;
  const dataPlaneUrl = this.sharedData?.dataPlaneUrl;

  if (!writeKey || !dataPlaneUrl) {
    console.log("Missing data. Write key or daya plane URL not found.");
    return;
  }

  await sendRudderEvent(writeKey, dataPlaneUrl);
});

Then("See the event delivered in webhook destination", async () => {
  const destinationsTab = await $('a[href="/destinations"]');
  await destinationsTab.click();

  //  const destinationRow = await $('div*=RSWEBHOOK');
  // await destinationRow.scrollIntoView();
  // await destinationRow.click();

  const destinationRow = await $('//div[contains(text(), "RSWEBHOOK")]');
  await destinationRow.scrollIntoView();
  await destinationRow.click();

  const eventsTab = await $('div[role="tab"][id*="Events"]');
  await eventsTab.click();

  const deliveredCount = await $("span=Delivered")
    .$("..")
    .$("h2 span")
    .getText();
  const failedCount = await $("span=Failed").$("..").$("h2 span").getText();

  console.log(`Delivered Events: ${deliveredCount}`);
  console.log(`Failed Events: ${failedCount}`);
});
