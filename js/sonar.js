const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl : 'https://sonar8.cai-inc.com',
    token : "2152adcbadecb6d0769455db68b7d36baf9fa446",
    options: {
      'sonar.projectKey': 'jarvis-server',
      'sonar.sources': '/Users/zcy/Desktop/code/nlp-server',
    }
  },
  () => process.exit()
)