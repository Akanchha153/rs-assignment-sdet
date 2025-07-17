import { ExtractUrlLocators } from "../constants/keys";

class ExtractUrl {
  async getDataPlaneUrl() {
    const dataPlaneElement = await $(ExtractUrlLocators.textEllipsis);
    return await dataPlaneElement.getText();
  }

  async getWriteKey() {
    const allSpans = await $$(ExtractUrlLocators.textEllipsis);
    for (const el of allSpans) {
      const text = await el.getText();
      if (text.startsWith("Write key")) {
        return text.replace("Write key ", "").trim();
      }
    }
    throw new Error("Write Key not found on the page.");
  }
}

export default new ExtractUrl();
