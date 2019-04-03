import * as React from 'react';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { Captcha, CaptchaProps } from '.';
import { constants } from './test-assets/constants';
import { captchaDriverFactory } from './Captcha.driver';

describe('Captcha', () => {
  const testContainer = new ReactDOMTestContainer().unmountAfterEachTest();

  const createDriver = testContainer.createUniRendererAsync(
    captchaDriverFactory,
  );

  const getDefaultProps = () => ({
    sitekey: constants.demoSiteKey,
    loader: <div />,
  });

  it('should render captcha with a required prop', async () => {
    const driver = await createDriver(
      <Captcha {...getDefaultProps()} required />,
    );
    expect(await driver.isRequired()).toBe(true);
  });
});
