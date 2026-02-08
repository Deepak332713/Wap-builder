function startPrediction() {
    const n1 = document.getElementById('name1').value.trim();
    const n2 = document.getElementById('name2').value.trim();

    if (n1 === "" || n2 === "") {
        alert("कृपया दोनों नाम भरें!");
        return;
    }

    // UI में बदलाव
    document.getElementById('calcBtn').classList.add('hidden');
    document.getElementById('loader').classList.remove('hidden');

    // 2 सेकंड का नकली "AI Processing" टाइम
    setTimeout(() => {
        const score = Math.floor(Math.random() * 41) + 60; // 60% से 100% के बीच स्कोर
        showResult(score);
    }, 2000);
}

function showResult(score) {
    document.getElementById('loader').classList.add('hidden');
    const resultBox = document.getElementById('resultBox');
    const scoreDisplay = document.getElementById('percentage');
    const msgDisplay = document.getElementById('aiMessage');

    resultBox.classList.remove('hidden');
    scoreDisplay.innerText = score + "%";

    if (score > 90) {
        msgDisplay.innerText = "AI का मानना है कि आप दोनों एक दूसरे के लिए ही बने हैं। ✨";
    } else if (score > 80) {
        msgDisplay.innerText = "बेहतरीन तालमेल! बस थोड़ी सी समझदारी और सब परफेक्ट है। ❤️";
    } else {
        msgDisplay.innerText = "रिश्ता गहरा है, बस वक्त देने की जरूरत है। 😊";
    }
}

