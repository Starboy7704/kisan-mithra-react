import fetch from "node-fetch";

export default async function (req, res) {
  try {
    const body = JSON.parse(req.body || "{}");
    const { audioBase64 } = body;

    if (!audioBase64) {
      return res.json({ success: false, error: "No audio provided" });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return res.json({ success: false, error: "Missing API key" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: "audio/wav",
                    data: audioBase64,
                  },
                },
                {
                  text: "Transcribe and translate to English only.",
                },
              ],
            },
          ],
        }),
      }
    );

    const geminiData = await response.json();

    const transcript =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!transcript) {
      return res.json({
        success: false,
        error: "Transcript not found",
        raw: geminiData,
      });
    }

    return res.json({
      success: true,
      transcriptEnglish: transcript,
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err.message,
    });
  }
}