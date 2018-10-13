# imodel-query-agent

Copyright © 2018 Bentley Systems, Incorporated. All rights reserved.

imodel-query-agent is an example of an agent running on the server that illustrates
use of the iModel.js API to query changes made to iModels on the iModelHub.
(NOTE: MUST BE CONFIGURED TO RUN: see Configuration section below)

More specifically, the application demonstrates use of API to:

* Listen to 'Change Sets' posted to the iModels on the iModelHub.
* Listen to 'Named Versions' created for iModels on the iModelHub.
* Query and download these Change Sets from the iModelHub.
* Parse the Change Sets to construct a 'Change Summary' of useful information contained in them.
* Iterate and query the information contained in the Change Summary.

See http://imodeljs.org for comprehensive documentation on the iModel.js API and the various constructs used in this sample.

## Build

All of these commands are run from the root directory of imodel-query-agent.

1. Clone repository (first time) with `git clone` or pull updates to the repository (subsequent times) with `git pull`
2. Install dependencies: `npm install`
3. Clean output: `npm run clean`
4. Build source: `npm run build -s`

The `-s` option is short for `--silent` which results in a less verbose command.

Note that it is a good idea to `npm install` after each `git pull` as dependencies may have changed.

## Start

Use `npm start` to start the Query Agent. Watch the console for various messages that show the progress -

* Register event handlers that listen to Change Sets being posted to the iModelHub.
* Register event handlers that listen to Named Versions created on the iModelHub.
* Receive notification of a new Change Set posted to the iModelHub.
* Receive notification of a new Named Version created on the iModelHub.
* Extract Change Summary information from the Change Set.
* Dump the contents of the Change Summary as a JSON file to disk.

### Run Query Agent with Manual Changeset Generation

To manually generate changesets for the Query Agent to detect use the imodel-changeset-test-utility CLI with the Query Agent as follows:

1. Run the changeset test utility using `npm run start-changeset-util`.
2. Wait until the logs from running the command above indicate that the iModel has been pushed to the iModelHub.
3. Once the iModel is setup in the hub, in a separate shell run the Query Agent on the same iModel using `npm run start`.
4. Observe the change summaries as they are processed by the Query Agent.

### Run Query Agent with Automated Changeset Generation

The command `npm run start-with-changesets` is provided for convenience to run the Query Agent and Changeset Generation in parallel.
This command uses `run-p` (run parallel) and `run-s` (run synchronous) from the npm package `npm-run-all` to run two scripts in parallel:
one that starts changeset utility creating an iModel in the hub and generating changesets upon it,
and a second which pauses for 20 seconds to ensure the iModel is setup properly before starting the Query Agent.

## Test

Use `npm test` to run unit tests

Use `npm run test:integration` to run integration tests

## Configuration

To use a custom configuration use any combination command line arguments, environments variables, or using iModelJs configuration (see QueryAgentConfig.ts).
For a quick configuration, replace the strings in the `Fill These Out` section of QueryAgentConfig.ts with ones obtained from OIDC registration.
Other options include: providing environment variables with names of the keys in QueryAgentConfig.ts and proper values, and setting up a JSON5 file named `default.json5`
in a directory named `imodeljs-config` that is parallel with the root of this repo (I.E /imodel-query-agent) with the proper variable setup.
This will automatically be absorbed by the configuration framework.

- For a custom configuration in the CLI use some or all of the following parameters preceded by "--":

```json
  "--email=Fake@email.com", "--password=yourPass", "--projectName=YourTestProject",
  "--iModelName=ChangesetUtility"
```

- For example `npm start -- --email=Fake@email.com --password=yourPass`
- (Note: all times are in ms)

## Debugging

To debug the Query Agent Code click the launch configuration `Attach to Main.js` in the debug menu for VS code. Then in your terminal run `npm run start:debug` and wait for breakpoints to be hit.

## Contributing

[Contributing to iModel.js](https://github.com/imodeljs/imodeljs/blob/master/CONTRIBUTING.md)
