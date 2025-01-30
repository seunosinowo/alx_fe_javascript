// Define an array to store quote objects
let quotes = [
    { text: "Believe you can and you're halfway there.", category: "Inspirational" },
    { text: "The only way to do great work is to love what you do.", category: "Motivational" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspirational" },
];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // Clear existing quote

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
    showRandomQuote();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", function() {
    showRandomQuote();
    document.getElementById("addQuoteForm").style.display = "none";
});

// Event listener for the "Add Quote" button
document.getElementById("addQuoteForm").style.display = "none"; // Hide form initially
document.getElementById("newQuote").addEventListener("click", function() {
    document.getElementById("addQuoteForm").style.display = "block";
    createAddQuoteForm();
});

// Display a random quote on page load
showRandomQuote();