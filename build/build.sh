npm install buildify
wait
node r.js -o r.js.config
wait
node compress.js
rm ../public/app.min.js
