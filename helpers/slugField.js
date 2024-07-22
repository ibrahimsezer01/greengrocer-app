const slugify = require('slugify')

const options = {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'tr',      // language code of the locale to use
    trim: true 
}

module.exports = function slugfield(str) {
    return slugify(str, options)
  }