const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false ;
}

// Show new quote
function newQuote(){
    loading();
    // To pick a random quite from a quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'unknown'
    if (!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check the quote length to determine if we apply the long-quote class styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const resonse = await fetch (apiUrl);
        apiQuotes = await resonse.json();
        newQuote();
    } catch (error) {
        // Catch error
    }
}

// Tweet a quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
