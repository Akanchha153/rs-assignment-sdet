exports.config = {
  runner: 'local',
framework: 'cucumber',
  specs: ['./features/**/*.feature'],
  cucumberOpts: {
    require: ['./features/step-definitions/*.js'],
    timeout: 60000,
     strict: true
  },
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
    args: ['--disable-gpu', '--window-size=1280,800']
  }

  }],
  logLevel: 'info',
  services: ['chromedriver'],
  reporters: ['spec'],
};

