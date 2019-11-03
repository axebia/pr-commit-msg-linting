import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const titleRegex = core.getInput('title-regex', {required: true});
    core.debug(`Checking ${titleRegex} against the PR title`);

    const title = github.context!.payload!.pull_request!.title;
    console.log(`title: ${title}`);

    if (!title.match(new RegExp(titleRegex))) {
      core.setFailed(`Please fix your PR title to match ${titleRegex} Example: GEN-1234 or gen-1234`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
