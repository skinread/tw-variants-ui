import { injectAxe, checkA11y } from 'axe-playwright';
import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  setup() {
    process.env.STORYBOOK_TEST_ENV = 'test';
  },

  async preVisit(page) {
    await injectAxe(page);

    // Start coverage collection
    await page.evaluate(() => {
      // @ts-expect-error - Coverage is injected by the test runner
      if (window.collectIstanbulCoverage) {
        // @ts-expect-error - Coverage is injected by the test runner
        window.collectIstanbulCoverage();
      }
    });
  },

  async postVisit(page) {
    // Check accessibility with aXe
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });

    // Snapshot testing
    const elementHandler = await page.$('#storybook-root');
    await new Promise((resolve) => setTimeout(resolve, 10));
    const innerHTML = await elementHandler?.innerHTML();
    // @ts-expect-error - toMatchSnapshot is a custom matcher
    expect(innerHTML).toMatchSnapshot();

    // Collect coverage from the page
    const coverage = await page.evaluate(() => {
      // @ts-expect-error - Coverage is injected by the test runner
      if (window.collectedCoverage) {
        // @ts-expect-error - Coverage is injected by the test runner
        return window.collectedCoverage;
      }
      return null;
    });

    if (coverage) {
      // This will be picked up by the test runner
      globalThis.__coverage__ = coverage;
    }
  },
};

export default config;
