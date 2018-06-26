// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

let url = 'localhost:8000';
//let url = '138.197.137.68:8000';

export const environment = {
  production: false,
  baseURL: `http://${url}`,
  ethURL: `https://ropsten.etherscan.io`,
  url: url,
};
