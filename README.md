# NewSearch #


## Introduction ##

LIFIA's, training extension, designed to manage fetching and retrieving data from other websites. In this particular case, selecting text marked as `<h1>` in [Wikipedia][wiki], in order to retrieve related news from [DiarioRegistrado][dr].

[wiki]: https://en.wikipedia.org/wiki/Home_Page
[dr]: https://www.diarioregistrado.com/ 


## Requierments ##

* Firefox 57 or Chrome 65 onwards.
* npm 3.5.2 onwards.

### Build ###

Clone the repo: 
git clone https://github.com/fpisoni/NewSearch.git

... and download the dependencies:

```sh
cd /path/to/folder/NewSearch
npm install
```

### Loading from Mozilla ###

1. Open "about:debugging".
2. Click the "Load Temorary Add-on" button.
3. Select any of the files where the manifest.json it's located.

### Loading from Chromium ###

1. Open "chrome://extensions/" in Chrome.
2. Enable the "Developer mode".
3. Click "Load not packaged extension".
4. Select any file in your add-on's root directory (NewSearch).

###Usage###


When the extension it's loaded, simply go to an article at Wikipedia and press the "Search" button right next to the title of it. That'll create a modal with links below to DiarioRegistrado.
Once you're done with the modal, click the "X" button in the right to close it.