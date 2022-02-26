# Wordle Ideas

## UI

* Display as sidebar alongside wordle
* Provide popup to automatically input everything

## Parsing Content

* Parse from DOM in Chrome extension
* `document.` queries
* Wordle exposes `evaluation` (e.g. "present", "absent") attribute on their `game-tile` component
* Game tiles are organised into `<game-row>`
	* All present at the start, but empty until letters are typed
	* `letters` attribute tells what letters are there
		* Just `letters` until letters are typed
		* One typed, looks like `letters="abcde"`
		* Actual letters stored in a shadow root in game row

Exepected output format:
```json
{
	"absent": "everyabsentletter",
	"present": [
		{
			"letter": "l",
			"position": 0
		}
	],
	"correct": [
		{
			"letter": "a",
			"position": 3
		}
	]
}
```

## Calculating Entropy

1. Iterate through word list
2. Filter word list based on what words are possible (eventually cache for next round for speedup)
3. Iterate through each possible word left as our target word
	1. Iterate through each possible word as our guessed word
		1. Record the board configuration for that guess

## Scanning Words for Maximum Entropy

1. Iterate through word list for guesses
	1. Iterate through word list for targets
		2. Find the colouring for the pair
		3. Increment the count of the colouring for that guess
	2. Find the total number of colourings
	3. Divide the counts by the total number to get the probability for the word
	4. Store in dict of probabilities for each guess