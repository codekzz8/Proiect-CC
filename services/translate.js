const { Translate } = require('@google-cloud/translate').v2
require('dotenv').config()

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)
// const CREDENTIALS = process.env.CREDENTIALS

const client = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
})

/**
 * Detects language of request body text and returns a string
 * @param {Request} req Reference to the request from the client (the body must contain a 'text' field).
 *                      - { text: 'input text' }
 * @param {Response} res Reference to the response that will be sent to the client.
 * @returns {string} The text language in short form (eg. 'en' for english)
*/
async function detectLanguage(req, res) {
    const text = req.body.text
    const response = await client.detect(text)
    language = response[0].language
    return language;
}

/**
 * Translates text into target language, both from request body.
 * @param {Request} req Reference to the request from the client (the body must contain a 'text' field).
 *                      - Must contain 'text' and 'target_language' fields
 * @param {Response} res Reference to the response that will be sent to the client.
 * @returns {string} The text translated into the target language.
 */
async function translateText(req, res) {
    const text = req.body.text
    const targetLanguage = req.body.target_language

    const response = await client.translate(text, targetLanguage)
    const translatedText = response[0]
    return translatedText;
}

module.exports = {
    detectLanguage,
    translateText
}