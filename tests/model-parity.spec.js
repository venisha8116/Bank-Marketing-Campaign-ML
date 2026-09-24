import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

test("frontend prediction matches Python model", async () => {
  const projectRoot = path.resolve(".");
  const pythonScript = path.join("tests", "generate_model_predictions.py");
  const outputFile = path.join("tests", "model_parity_data.json");

  // Generate predictions from the actual Python model
  execFileSync(
    "python",
    [pythonScript],
    {
      cwd: projectRoot,
      stdio: "inherit",
    }
  );

  const testData = JSON.parse(
    fs.readFileSync(outputFile, "utf8")
  );

  const { predict } = await import(
    "../frontend/src/services/predictionService.js"
  );

  expect(testData.length).toBeGreaterThan(0);

  for (const sample of testData) {
    const frontendResult = predict(sample.input);

    expect(frontendResult.prediction).toBe(
      sample.pythonPrediction
    );

    expect(
      Math.abs(
        frontendResult.probability -
        sample.pythonProbability
      )
    ).toBeLessThan(0.00001);
  }
});