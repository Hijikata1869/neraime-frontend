import { test, expect } from '@playwright/test';

test("新規ユーザーを作成できること",async ({ page }) => {
    await page.goto("http://localhost:3000/signup/");
});