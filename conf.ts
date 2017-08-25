// Because this file imports from `protractor` npm package, 
// you'll need to have it as a project dependency. 
//
// Why you might want to create your config with Typescript:
// Editors like Microsoft Visual Studio Code will have
// autocomplete and description hints.

// `baseUrl` property is passed in as a param
import { Config, browser } from 'protractor';
import { SpecReporter } from 'jasmine-spec-reporter';

export let config: Config = {
  allScriptsTimeout: 11000,
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 15000,
    print: function() {}
  },

  // Keep max browsers running to 1 because
  // multiple browsers running at once was pausing/failing for no reason
  maxSessions: 1,

  // You could set no globals to true to avoid jQuery '$' and protractor '$'
  // collisions on the global namespace.
  noGlobals: true,

  onPrepare: () => {
    // Use `jasmine-spec-reporter` as the spec result reporter
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    
    // Set browser window width to 1200 and height to 900px
    browser.driver.manage().window().setSize(1200, 900);
  },
  params: {
    baseUrl: 'https://www.google.com'
  },
  specs: [ 'specs/**/*spec.js' ],

  // If want to target a specific spec file (eg while creating a new one)
  // specs: [ 'specs/login/loginGlobalHeader.spec.js' ],

  seleniumAddress: 'http://localhost:4444/wd/hub'
};
