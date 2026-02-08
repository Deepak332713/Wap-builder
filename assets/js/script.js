const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // यहाँ अपनी चाबी (Key) डालें

async function generateWebsite() {
    const prompt = document.getElementById('userPrompt').value;
    if (!prompt) return alert("कुछ तो लिखो भाई!");

    // UI अपडेट
    document.getElementById('buildBtn').style.display = 'none';
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('resultBox').classList.add('hidden');

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ 
                        text: `You are an expert web developer. The user wants: ${prompt}. Provide the full HTML code including CSS and JS in one single file. Only give the code, no explanation.` 
                    }] 
                }]
            })
        });

        const data = await response.json();
        const code = data.candidates[0].content.parts[0].text;

        // कोड दिखाओ
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('resultBox').classList.remove('hidden');
        document.getElementById('generatedCode').value = code.replace(/```html|```/g, ""); // क्लीन कोड
    } catch (error) {
        alert("API Key सही डालें या इंटरनेट चेक करें!");
        location.reload();
    }
}

function copyCode() {
    const codeArea = document.getElementById('generatedCode');
    codeArea.select();
    document.execCommand('copy');
    alert("कोड कॉपी हो गया!");
}
