const fs = require('fs');
const pkg = require('./package.json');

const keepAsDependencies = ['prop-types', 'react', 'react-dom'];

const dependencies = {};
const devDependencies = {};
Object.entries(pkg.dependencies).forEach(([key, value]) => {
  if (keepAsDependencies.includes(key)) {
    dependencies[key] = value;
  } else {
    devDependencies[key] = value;
  }
});

const newPackage = {
  ...pkg,
  husky: {
    hooks: {
      'pre-commit': 'lint-staged',
      'pre-push': 'CI=true yarn test --passWithNoTests',
    },
  },
  dependencies,
  devDependencies,
  peerDependencies: {
    react: '>=16.8.0',
    'react-dom': '>=16.8.0',
  },
  files: ['lib'],
  engines: {
    node: '>=10',
  },
  private: false,
};

fs.writeFileSync('package.json', JSON.stringify(newPackage, null, 2));
fs.unlinkSync('prepare.js');
