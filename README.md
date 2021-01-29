# CAR FOR YOU Phraseapp workflow

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


## Usage
```
npm install @carforyou/phraseapp
```

Lint the sort order, respectively sort the translation files:
```
cfy-phraseapp sort
cfy-phraseapp sort --fix
```

Vaildate the consistency of the translation keys:
```
cfy-phraseapp validate
```

Push translations on CI:
```
PHRASEAPP_TOKEN=abc123 cfy-phraseapp push
```

Create a .phraseapp.yml:
```
phraseapp:
  project_id: <your project id>
  file_format: json

  push:
    sources:
    - file: ./public/static/locales/<locale_name>/app.json

  pull:
    targets:
    - file: ./public/static/locales/<locale_name>/app.json
      params:
        include_empty_translations: true
```

## Development
Some commands require a `PHRASEAPP_TOKEN`. In order not to type it over and over again, you can set it "globally" in your `.zshrc` or equivalent:
```
export PHRASEAPP_TOKEN=abc123
```

```
npm run build && npx cfy-phraseapp <command>
```

We also ave a dummy phraseapp project set up, where you can safely push to:
```
CIRCLE_BRANCH=master PHRASEAPP_TOKEN=abc123 cfy-phraseapp push
```

## Test
```
PHRASEAPP_TOKEN=abc123 npm run test
```

## Development
You can link your local npm package to integrate it with any local project:
```
cd carforyou-phraseapp-pkg/pkg
npm link

cd carforyou-listings-web
npm link @carforyou/phraseapp

cd carforyou-phraseapp-pkg
npm run build

cd carforyou-listings-web
cfy-phraseapp <command>
```

## Release a new version

New versions are released on the ci using semantic-release as soon as you merge into master. Please
make sure your merge commit message adheres to the corresponding conventions.

## Update phraseapp-cli
On CI, we use the phrasepp-cli binary. Locally, you will need to install one manually.

To update the CI bindary, get the latest link from https://github.com/phrase/phraseapp-client/releases and download the binary as follows:
```
wget -O bin/phraseapp "https://github.com/phrase/phraseapp-client/releases/download/<version>/phraseapp_linux_386"
chmod +x bin/phraseapp
```
