const axios = require("axios");

async function analyzeJournal(text) {
    try {

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "user",
                        content: `
Analyze the journal entry and return ONLY JSON.

Format:
{
 "emotion":"",
 "keywords":[],
 "summary":""
}

Journal:
${text}
`
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {

        console.log("LLM ERROR:");
        console.log(error.response?.data || error.message);

        return null;

    }
}

module.exports = analyzeJournal;