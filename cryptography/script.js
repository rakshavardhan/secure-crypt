// Caesar Cipher Function
function caesarCipher(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-z]/i)) {
            let charCode = text.charCodeAt(i);
            let base = charCode >= 65 && charCode <= 90 ? 65 : 97;
            result += String.fromCharCode(((charCode - base + shift) % 26 + 26) % 26 + base);
        } else if (char.match(/[0-9]/)) {
            let numShift = (parseInt(char) + shift) % 10;
            if (numShift < 0) numShift += 10;
            result += numShift;
        } else {
            result += char;
        }
    }
    return result;
}

// Function to Encrypt the Message
function encryptMessage() {
    const message = document.getElementById("message").value;
    const shift = parseInt(document.getElementById("shift").value);
    if (isNaN(shift)) {
        alert("Please enter a valid shift value!");
        return;
    }
    const encrypted = caesarCipher(message, shift);
    document.getElementById("output").innerText = `Encrypted Message: ${encrypted}`;
    speakText(`Encrypted Message: ${encrypted}`);
}

// Function to Decrypt the Message
function decryptMessage() {
    const message = document.getElementById("message").value;
    const shift = parseInt(document.getElementById("shift").value);
    if (isNaN(shift)) {
        alert("Please enter a valid shift value!");
        return;
    }
    const decrypted = caesarCipher(message, -shift);
    document.getElementById("output").innerText = `Decrypted Message: ${decrypted}`;
    speakText(`Decrypted Message: ${decrypted}`);
}

// Function for Text-to-Speech
function speakText(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}

// Function for Speech-to-Text (Voice Input)
function startVoiceInput() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    
    recognition.onresult = function (event) {
        const spokenText = event.results[0][0].transcript;
        document.getElementById("message").value = spokenText;
        speakText(`You said: ${spokenText}`);
    };

    recognition.onerror = function (event) {
        alert('Error in speech recognition: ' + event.error);
    };
}
