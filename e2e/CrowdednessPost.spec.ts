import { test, expect } from "@playwright/test";

test("混雑度を投稿できること", async ({ page }) => {

    await page.goto("http://localhost:3200/sign-in/");

    await page.getByRole("textbox", {
        name: "Eメール"
    }).fill("e2e@example.com");

    await page.getByRole("textbox", {
        name: "パスワード"
    }).fill("e2e_pass");

    await page.getByRole('button', { name: 'ログイン' }).nth(2).click();

    await page.waitForURL("http://localhost:3200/");

    await page.goto("http://localhost:3200/stores/1/");

    await page.getByRole("button", {
        name: "混雑度を投稿する"
    }).click();

    await page.getByRole("combobox", { name: "訪問した曜日" }).selectOption({ value: "月曜日" });

    await page.getByRole("combobox", { name: "訪問した時間" }).selectOption({ value: "12:00" });

    await page.getByRole('button', { name: '混雑', exact: true }).click();

    await page.getByRole("textbox", { name: "メモ・口コミ - 任意"}).fill("混んでました。");

    await page.locator('form').getByRole('button', { name: '混雑度を投稿する' }).click();

    await expect(page.getByText("投稿しました")).toBeVisible();
});