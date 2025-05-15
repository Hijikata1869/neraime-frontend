import { test, expect } from '@playwright/test';

test("新規ユーザーを作成できること",async ({ page }) => {

    const timestamp = Date.now();
    const email = `test_user_${timestamp}@example.com`;

    await page.goto("http://localhost:3200/sign-up/");

    await page.getByRole("textbox", {
        name: "ニックネーム"
    }).fill("test_user");

    await page.getByRole("textbox", {
        name: "Eメール"
    }).fill(email);

    await page.getByRole('textbox', { name: 'パスワード', exact: true }).fill("test_user_pass");
    await page.getByRole('textbox', { name: 'パスワード（確認用）' }).fill("test_user_pass");

    await page.getByRole('button', { name: '新規登録' }).nth(2).click();

    
    await expect(page.getByText("登録しました")).toBeVisible();
});