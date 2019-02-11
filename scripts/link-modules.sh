rm -rf node_modules/@component-sheet
mkdir -p node_modules/@component-sheet
cd node_modules/@component-sheet
find ../../packages -mindepth 1 -maxdepth 1 | xargs -I% ln -s % .
