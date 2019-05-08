# CAR FOR YOU Phraseapp workflow

## Usage
```
npm install @carforyou/phraseapp
PHRASEAPP_TOKEN=abc123 cfy-phraseapp push
```

## Release a new version
```
npm run release
```

## Development
You can link your local npm package in any project to test it locally:
```
cd carforyou-phraseapp-pkg/pkg
npm link

cd carforyou-listings-web
npm link @carforyou/phraseapp

cd carforyou-phraseapp-pkg
npm run build

cd carforyou-listings-web
cfy-phraseapp push
```

## Update phraseapp-cli
Get the latest link from https://github.com/phrase/phraseapp-client/releases and download the binary as follows:
```
wget -O bin/phraseapp "https://github.com/phrase/phraseapp-client/releases/download/1.12.3/phraseapp_linux_386"
chmod +x bin/phraseapp
```
