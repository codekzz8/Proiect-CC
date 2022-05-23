const languages = require('./languages.json')

function getLanguageByCode(languageCode) {
    for (var key in languages) {
        if (key == languageCode) {
            return languages[key];
        }
    }
    return 'language not found';
}

module.exports = {
    getLanguageByCode
}