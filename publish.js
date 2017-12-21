const ghpages = require('gh-pages');
const path = require('path');

const REPO_URL = 'git@github.com:julioolvr/julioolvr.github.com.git';
const BRANCH = 'master';

const options = {
  repo: REPO_URL,
  branch: BRANCH,
  dotfiles: true
};

ghpages.publish(path.join(__dirname, 'out'), options, err => {
  if (err) {
    console.error('Error publishing', err); // eslint-disable-line no-console
  } else {
    console.log('Published'); // eslint-disable-line no-console
  }
});
