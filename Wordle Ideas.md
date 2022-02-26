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