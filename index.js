const fs = require('fs');
const postcss = require('postcss');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

fs.readFile('from/app.css', (err, css) => {
    postcss([precss, autoprefixer({
        browsers: [
            'last 4 versions',
            '>1%',
            'Firefox ESR',
            'iOS 8',
            'not ie < 9'
        ]
    })])
        .process(css, {
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