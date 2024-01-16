var inputLanguage = document.getElementById('languageSelect1');
var outputLanguage = document.getElementById('languageSelect2');
var inputText = document.getElementById('inputText');
var outputText = document.getElementById('outputText');

document.getElementById('translateBtn').addEventListener('click', async () => {
  try {
    const response = await axios.post('https://translator-website-xglm.onrender.com/translate', {
    
        inputText: inputText.value,
      inputLanguage: inputLanguage.value,
      outputLanguage: outputLanguage.value,
     
      
    });

    console.log(response.data.translatedText);
    outputText.textContent = response.data.translatedText;
  } catch (error) {
    console.error('Error:', error);
  }
});


