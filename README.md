# fouedgames.github.io

Website for Foued Dhaya's mobile games, live at **https://fouedgames.github.io**.

- **Shokoban**: box-pushing puzzle game, [Google Play](https://play.google.com/store/apps/details?id=com.twodStudio.shokoban)
- **Moto Rush**: stunt bike racing, [Google Play](https://play.google.com/store/apps/details?id=com.twodStudio.motorush)
- **Sneaky Snout**: fox platformer, coming to Google Play (the badge markup is ready in a comment in `index.html`)

Plain static HTML/CSS/JS with no build step: edit `index.html`, push, and GitHub Pages publishes it.
Also served from here: the privacy policies of all three games on one page, `privacy.html`, with a
tab per game. The address picks the tab (`privacy.html#shokoban`, `#motorush`, `#sneakysnout`), so
each game can use its own link in Play Console. `motorush/privacy.html` is the address Moto Rush's
listing was created with; it now redirects to the shared page.
