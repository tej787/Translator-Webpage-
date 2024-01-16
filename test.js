var textToCopy = "Hello, world!";

// Create a temporary textarea element
var textarea = document.createElement("textarea");
textarea.value = textToCopy;
document.body.appendChild(textarea);

// Select the text in the textarea
textarea.select();

// Execute the copy command
document.execCommand("copy");

// Remove the temporary textarea
document.body.removeChild(textarea);

console.log("Text copied to clipboard: " + textToCopy);