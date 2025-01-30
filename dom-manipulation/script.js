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
    populateCategories();
    filterQuotes();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
}

// Function to populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = ""; // Clear existing categories

    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    uniqueCategories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All Categories";
    categoryFilter.insertBefore(allOption, categoryFilter.firstChild);
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = ""; // Clear existing quotes

    const selectedCategory = document.getElementById("categoryFilter").value;
    const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory || selectedCategory === "all");

    if (filteredQuotes.length === 0) {
        quoteDisplay.textContent = "No quotes available in this category.";
        return;
    }

    filteredQuotes.forEach(quote => {
        const quoteTextPara = document.createElement("p");
        quoteTextPara.textContent = quote.text;
        quoteDisplay.appendChild(quoteTextPara);

        const quoteCategoryPara = document.createElement("p");
        quoteCategoryPara.textContent = `Category: ${quote.category}`;
        quoteDisplay.appendChild(quoteCategoryPara);
    });
}

// Function to simulate server interaction
function simulateServerInteraction() {
    // Simulate fetching data from the server
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            // Update local quotes array with server data
            quotes = data.map(post => ({ text: post.title, category: post.userId }));
            saveQuotes();
            populateCategories();
            filterQuotes();
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to sync local data with server
function syncWithServer() {
    simulateServerInteraction();
    document.getElementById("syncStatus").textContent = "Data synced with server.";
}

// Event listeners
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportQuotes").addEventListener("click", exportQuotesToJson);
document.getElementById("syncWithServer").addEventListener("click", syncWithServer);

// Load existing quotes from local storage
loadQuotes();

// Populate categories in the dropdown
populateCategories();

// Simulate initial server interaction
simulateServerInteraction();