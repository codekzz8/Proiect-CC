const language = require('@google-cloud/language');
require('dotenv').config()

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)
// const CREDENTIALS = process.env.CREDENTIALS

const client = new language.LanguageServiceClient({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

/**
 * Analyzes a phrase from the request body and returns a Map<string, Array<number>>.
 * @param {Request} req Reference to the request from the client (the body must contain a 'text' field).
 *                      - { text: 'input text' }
 * @param {Response} res Reference to the response that will be sent to the client.
 * @returns {Map<string, Array<number>} - First element = 'documentLanguage' => language code
 *                                      - Second element = 'documentSentiment' => [magnitude, score]
 *                                      - Next elements = 'sentence text' => [magnitude, score]
 */
async function analyzeText(req, res) {
    requestText = req.body.text
    const document = {
        content: requestText,
        type: 'PLAIN_TEXT'
    }
    const result = await client.analyzeSentiment({document: document});
    var results = new Map()
    results.set("documentLanguage", result[0].language)
    results.set('documentSentiment', [result[0].documentSentiment.magnitude, result[0].documentSentiment.score])
    results.set('sentences', result[0].sentences)
    // for (item of result[0].sentences) {
    //     results.set(item.text.content, [item.sentiment.magnitude, item.sentiment.score])
    // }
    return results;
}

module.exports = {
    analyzeText
}