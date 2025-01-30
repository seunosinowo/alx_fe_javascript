// Define an array to store quote objects
let quotes = [];

// Load existing quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // Clear existing quote

    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Create paragraph elements using createElement and appendChild
    const quoteTextPara = document.createElement("p");
    quoteTextPara.textContent = randomQuote.text;
    quoteDisplay.appendChild(quoteTextPara);

    const quoteCategoryPara = document.createElement("p");
    quoteCategoryPara.textContent = `Category: ${randomQuote.category}`;
    quoteDisplay.appendChild(quoteCategoryPara);
}

// Function to create and display the add quote form
function createAddQuoteForm() {
    const addQuoteFormContainer = document.getElementById("addQuoteForm");
    addQuoteFormContainer.innerHTML = ""; // Clear existing form

    // Create form elements using createElement and appendChild
    const newQuoteTextInput = document.createElement("input");
    newQuoteTextInput.type = "text";
    newQuoteTextInput.id = "newQuoteText";
    newQuoteTextInput.placeholder = "Enter a new quote";
    addQuoteFormContainer.appendChild(newQuoteTextInput);

    const newQuoteCategoryInput = document.createElement("input");
    newQuoteCategoryInput.type = "text";
    newQuoteCategoryInput.id = "newQuoteCategory";
    newQuoteCategoryInput.placeholder = "Enter quote category";
    addQuoteFormContainer.appendChild(newQuoteCategoryInput);

    const addQuoteButton = document.createElement("button");
    addQuoteButton.textContent = "Add Quote";
    addQuoteButton.onclick = addQuote;
    addQuoteFormContainer.appendChild(addQuoteButton);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    showRandomQuote();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
}

// Function to export quotes to JSON
function exportQuotesToJson() {
    const jsonQuotes = JSON.stringify(quotes);
    const blob = new Blob([jsonQuotes], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
}

document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportQuotes").addEventListener("click", exportQuotesToJson);

// Load existing quotes from local storage
loadQuotes();

// Display a random quote on page load
showRandomQuote();