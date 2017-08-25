import { Config } from 'protractor';
import { config as baseConfig} from './conf';

// Modify browsers used for testing
baseConfig.capabilities = undefined;
baseConfig.multiCapabilities = [
  {'browserName': 'chrome'},
  {'browserName': 'firefox'}
];

// Use modifed base config as protractor config
export let config: Config = baseConfig;
