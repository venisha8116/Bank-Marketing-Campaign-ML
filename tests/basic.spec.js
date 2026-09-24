import { test, expect } from "@playwright/test";

const pages = [
    { path: "/", text: "Machine Learning Project", type: "text" },
    { path: "/dashboard", text: "Bank Marketing Campaign Dashboard", type: "heading" },
    { path: "/dataset", text: "Dataset", type: "heading" },
    { path: "/eda", text: "EDA & Visualization", type: "heading" },
    { path: "/evaluation", text: "Model Evaluation", type: "heading" },
    { path: "/prediction", text: "Customer Subscription Prediction", type: "heading" },
    { path: "/about", text: "About This Project", type: "heading" },
];

test.describe("Bank Marketing Campaign website audit", () => {
    for (const pageInfo of pages) {
        test(`${pageInfo.path} loads correctly`, async ({ page }) => {
            await page.goto(pageInfo.path);

            if (pageInfo.type === "heading") {
                await expect(
                    page.getByRole("heading", { name: pageInfo.text })
                ).toBeVisible();
            } else {
                await expect(
                    page.getByText(pageInfo.text, { exact: true })
                ).toBeVisible();
            }

            // Check that the page did not show a generic error
            await expect(page.getByText("Something went wrong")).not.toBeVisible();
        });
    }

    test("sidebar contains only the final navigation items", async ({ page }) => {
        await page.goto("/dashboard");

        const sidebar = page.locator(".sidebar__nav");

        await expect(
            sidebar.getByRole("link", { name: "Dashboard" })
        ).toBeVisible();

        await expect(
            sidebar.getByRole("link", { name: "Prediction" })
        ).toBeVisible();

        await expect(
            sidebar.getByRole("link", { name: "Dataset" })
        ).toBeVisible();

        await expect(
            sidebar.getByRole("link", { name: "EDA & Visualization" })
        ).toBeVisible();

        await expect(
            sidebar.getByRole("link", { name: "Model Evaluation" })
        ).toBeVisible();

        await expect(
            sidebar.getByRole("link", { name: "About Project" })
        ).toBeVisible();

        await expect(
            sidebar.getByRole("link", { name: "Project Overview" })
        ).not.toBeVisible();

        await expect(
            sidebar.getByRole("link", { name: "Data Preprocessing" })
        ).not.toBeVisible();

        await expect(
            sidebar.getByRole("link", { name: "Model", exact: true })
        ).not.toBeVisible();
    });

    test("dataset page does not contain Data Preview", async ({ page }) => {
        await page.goto("/dataset");

        await expect(
            page.getByRole("heading", { name: "Data Preview" })
        ).not.toBeVisible();

        await expect(
            page.getByRole("heading", { name: "Feature Table" })
        ).toBeVisible();
    });

    test("EDA page does not contain heat map", async ({ page }) => {
        await page.goto("/eda");

        await expect(
            page.getByText(/heat map/i)
        ).not.toBeVisible();

        await expect(
            page.getByRole("heading", { name: "Verified EDA Findings" })
        ).toBeVisible();
    });

    test("landing page opens dashboard", async ({ page }) => {
        await page.goto("/");

        await page.getByRole("button", {
            name: "Open Dashboard",
        }).click();

        await expect(
            page.getByRole("heading", {
                name: "Bank Marketing Campaign Dashboard",
            })
        ).toBeVisible();
    });

    test("sidebar brand returns to landing page", async ({ page }) => {
        await page.goto("/dashboard");

        await page.locator(".sidebar__brand-button").click();

        await expect(
            page.getByText("Bank Marketing AI").first()
        ).toBeVisible();

        await expect(page).toHaveURL(/\/$/);
    });
});