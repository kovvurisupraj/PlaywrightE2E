import { test } from '../../fixtures/pageFixtures';
import loginData from '../../data/loginData.json';

for (const data of loginData) {
  test(`login error: ${data.scenarioName}`, async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(data.username, data.password);
    await loginPage.verifyLoginError(data.expectedError);
  });
}
