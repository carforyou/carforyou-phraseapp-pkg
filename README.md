# CAR FOR YOU Phraseapp workflow

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

## Development
```
npm run build && npx cfy-phraseapp <command>
```

We also ave a dummy phraseapp project set up, where you can safely push to:
```
CIRCLE_BRANCH=master PHRASEAPP_TOKEN=abc123 cfy-phraseapp push
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
```
npm run release
```

## Update phraseapp-cli
Get the latest link from https://github.com/phrase/phraseapp-client/releases and download the binary as follows:
```
wget -O bin/phraseapp "https://github.com/phrase/phraseapp-client/releases/download/<version>/phraseapp_linux_386"
chmod +x bin/phraseapp
```
