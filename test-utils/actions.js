export async function click(element) {
    await element.waitForClickable({ timeout: 5000 });
    await element.click();
}