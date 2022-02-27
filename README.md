![project logo](https://i.imgur.com/DqT2dFa.png) 
# WordML 

## Our Project

Our project is a Google Chrome browser extension that aids Wordle players in making calculated and informative guesses as they play.

![Imgur](https://i.imgur.com/FmXmVxS.png)
 
## Inspiration

Wordle is an easy to learn, daily puzzle game that has rapidly grown in popularity and was recently bought by the New York Times. A common issue players run into is picking the next possible guess based on the Wordle word set. Our chrome extension aims to help players solve the Wordle of the day efficiently. With over 12,000 different words to chose from, sometimes players need a hint to solve the daily challenge.

## What We Learned

This was everyone on our team's first Hackathon! So obviously, we learned a lot. In terms of soft skills, we learned...
* How to select a good topic
* How to plan out a multi-person project
* How to coordinate as a team while working on different components simultaneously
* How to communicate effectively

In terms of technical skills, this was our first time using the...
* Chrome extension API
* React
* Flask

From the problem specifically:
* How to narrow down possible answers based on given input from the game
* How to use information theory to calculate the best possible Wordle guess
* How to connect Python to JavaScript using a web server and API
* How to parse a web page using a Chrome extension and pass messages between the content and background scripts
* How to integrate the AI solver system, Flask web server, Chrome extension API, and React in the front end to create the final product

## How We Built Our Project

### Frontend

Chrome extension which tracked board state and interacted with an API to display the best words in a React frontend.
* Parsed changes to the Wordle board as the user entered new words using a content script
* Performed updates to the tracked board state as they came in by sending and processing them to a background script
* Poll the API using the full board configuration when the extension loads
* Display the information in the React frontend

### Backend

Flask web server which responded to API requests about the top 5 best words for a given configuration.
* Solver algorithm is implemented using Python
* Repeatable Python Wordle game to train and verify the algorithm on
* Flask web server to provide an API to access the solver indirectly

### Solver

With each word, the solver aims to pick the word that slims down the list of possible outcomes the most.
1. Look through each possible word
2. Find the set of board configurations (e.g. Green Yellow Gray Gray Green) for each word
3. Calculate the entropy, a measure of how uniform the data is, of the possible board configurations for each word
4. Picks the words with the highest entropy to suggest to the user

## Challenges

### Challenge 01 - Categorizing Letters

One of the main challenges we faced was matching Wordle's coloring strategy correctly. Letters from Wordle guesses can be sorted into correct (green), present (yellow), or absent (gray). The trouble comes from edge cases, like when you have multiple of the same letter in a word. This was problem for two areas in our code:
1. In the game simulation used to train and verify the algorithm, we need to perfectly match Wordle's functionality. It took some debugging to fix our logic, but we were able to match it perfectly in the end
2. In the solver algorithm, we need to be able to detect if a word is valid or not based on the colors that we've already seen (so we don't guess it when we know it would be bad). This means we have to apply Wordle's logic in reverse, which similarly required a *lot* of debugging.

### Challenge 02 - Decoupling Our Project

A constant challenge throughout the whole project was the ability to have all of the components communicate with each other. From scraping/parsing Wordle's source code in the Chrome extension content script, to the servers running our algorithm, we ended up using JSON to facilitate most of the communication.

When all the different components were integrated to make our final product, there gave rise to new issues and bugs. United by a passion to learn, members of the team overcame exhaustion and worked through challenging logic problems long through the night.

### Challenge 03 - Learning As We Went

Most of these technologies we were using for the first time, so a lot of time was spent simply learning how they worked. In particular, the Chrome extension API and React were pain points, but very fun to learn about and use in the project.


### Instructions to Use

1. Install backend dependencies: `pip3 install flask flask_cors numpy tqdm`
2. How to load extensions
    1. Install Node.js/NPM
    2. `cd extension`
    3. `npm install`
    4. `npm run build`
3. load extension/build into chrome
    1. Navigate to `chrome://extensions` in Chrome
    2. Toggle on developer mode if not already done
    3. Click "Load Unpacked"
    4. Choose the `extension/build` folder from this repository
4. Start the web server with `flask run -p 4999`
5. Load Wordle website and have fun!

