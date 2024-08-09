import { injectAxe, checkA11y } from 'axe-playwright';
import { type TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page /*, context */) {
    // check accessibility with aXe
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });

    // the #storybook-root element wraps the story
    // snapshot the DOM and compare it to the previous run
    const elementHandler = await page.$('#storybook-root');
    // occasionally the element needs a tick to render consistently
    await new Promise((resolve) => setTimeout(resolve, 10));
    const innerHTML = await elementHandler?.innerHTML();
    expect(innerHTML).toMatchSnapshot();
  },
};

export default config;
