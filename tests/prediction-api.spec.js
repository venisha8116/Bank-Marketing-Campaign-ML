import { test, expect } from "@playwright/test";

const testCustomer = {
  age: "57",
  job: "technician",
  marital: "married",
  education: "high.school",
  default: "no",
  housing: "no",
  loan: "yes",
  contact: "cellular",
  month: "may",
  day_of_week: "mon",
  campaign: "1",
  pdays: "999",
  previous: "1",
  poutcome: "failure",
  "emp.var.rate": "-1.8",
  "cons.price.idx": "92.893",
  "cons.conf.idx": "-46.2",
  euribor3m: "1.299",
  "nr.employed": "5099.1",
};

test("prediction form returns analysis from the FastAPI backend", async ({ page }) => {
  await page.goto("/prediction");

  for (const [name, value] of Object.entries(testCustomer)) {
    const control = page.locator(`[name="${name}"]`);
    const tag = await control.evaluate((el) => el.tagName);

    if (tag === "SELECT") {
      await control.selectOption(value);
    } else {
      await control.fill(value);
    }
  }

  await page.getByRole("button", { name: "Run Prediction" }).click();

  // The result is produced by the live backend (FastAPI + trained model),
  // not the in-browser fallback.
  await expect(
    page.getByText("Backend prediction · FastAPI + trained model")
  ).toBeVisible();

  // Outcome for this customer matches the trained Python model (0.978251).
  await expect(page.getByText("Likely to Subscribe")).toBeVisible();
  await expect(page.getByText(/97\.8%/).first()).toBeVisible();
  await expect(page.getByText("Target label: yes")).toBeVisible();
  await expect(page.getByText("Something went wrong")).not.toBeVisible();
});