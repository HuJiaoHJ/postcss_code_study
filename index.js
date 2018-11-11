const fs = require('fs');
const postcss = require('./postcss/lib/postcss');
const autoprefixer = require('autoprefixer');

fs.readFile('from/app.css', (err, css) => {
    const p = postcss([autoprefixer({
        browsers: [
            'last 4 versions',
            '>1%',
            'Firefox ESR',
            'iOS 8',
            'not ie < 9'
        ]
    })]);
    console.log(p.process.toString());
        p.process(css, {
            from: 'from/app.css',
            to: 'to/app.css',
        }).then(result => {
            console.log(result);
            fs.writeFile('to/app.css', result.css, () => true);
            if (result.map) {
                fs.writeFile('to/app.css.map', result.map, () => true);
            }
        })
});