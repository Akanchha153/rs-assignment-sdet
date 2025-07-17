import { WebhookPageLocators } from "../constants/webhookPage.js";

class WebhookPage {
  async goToDestinations() {
    const destinationsTab = await $(WebhookPageLocators.destinationsTab);
    await destinationsTab.click();
  }

  async goToRSWebhook() {
    const destinationRow = await $(WebhookPageLocators.rsWebhookDestinationRow);
    await destinationRow.scrollIntoView();
    await destinationRow.click();
  }

  async goToEventsTab() {
    const eventsTab = await $(WebhookPageLocators.eventsTab);
    await eventsTab.click();
  }

  get deliveredCount() {
    return $(WebhookPageLocators.deliveredCount).$("..").$("h2 span");
  }
  get failedCount() {
    return $(WebhookPageLocators.failedCount).$("..").$("h2 span");
  }

  async getDeliveryCounts() {
    const delivered = await this.deliveredCount.getText();
    const failed = await this.failedCount.getText();
    return { delivered, failed };
  }
}

export default new WebhookPage();
