"use strict";

const authorEl = document.getElementById("author");
const tagsEl = document.getElementById("tags");
const quoteEl = document.getElementById("quote");

const randomBtnEl = document.getElementById("button-random");
const shareBtnEl = document.getElementById("button-share");

async function getQuotes() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json"
    );

    if (!res.ok) {
      throw new Error("Something went wrong with fetching quotes");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function copyToClipboard(quote) {
  navigator.clipboard.writeText(quote);
}

function displayRandomQuote(quotes) {
  const randomNumber = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomNumber];

  tagsEl.textContent = "";

  authorEl.textContent = randomQuote.author;
  quoteEl.textContent = `“${randomQuote.quote}”`;

  for (const tag of randomQuote.tags) {
    const paraTag = document.createElement("p");
    paraTag.classList.add("tag");
    paraTag.textContent = tag;
    tagsEl.appendChild(paraTag);
  }

  shareBtnEl.addEventListener("click", () =>
    copyToClipboard(randomQuote.quote)
  );
}

async function randomQuoteGenerator() {
  const quotes = await getQuotes();

  if (quotes.length === 0) {
    console.error("No quotes available!");
    return;
  }

  displayRandomQuote(quotes);

  randomBtnEl.addEventListener("click", () => displayRandomQuote(quotes));
}

randomQuoteGenerator();
