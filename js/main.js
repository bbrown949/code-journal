const entriesList = document.querySelector('ul');
const $photoURL = document.querySelector('.url');
const $imagePlaceholder = document.querySelector('.image-placeholder');
const entryImagePlaceholder = 'images/placeholder-image-square.jpg';

$photoURL.addEventListener('input', function (event) {
  $imagePlaceholder.setAttribute('src', event.target.value);
});

const $entryForm = document.querySelector('form');
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const singleData = {
    title: event.target.elements.title.value,
    comment: event.target.elements.comment.value,
    url: event.target.elements.url.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(singleData);
  $imagePlaceholder.setAttribute('src', entryImagePlaceholder);
  $entryForm.reset();

  const $renderEntry = renderEntry(singleData);
  entriesList.prepend($renderEntry);
  viewSwap('entries');
  data.view = 'entries';
});

function renderEntry(entry) {
  const $li = document.createElement('li');

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  const $columnHalfOne = document.createElement('div');
  $columnHalfOne.setAtrribute('class', 'column-half');
  $row.appendChild($columnHalfOne);

  const $columnHalfTwo = document.createElement('div');
  $columnHalfTwo.setAttribute('class', 'column-half');
  $row.appendChild($columnHalfTwo);

  const $imgLine = document.createElement('img');
  $imgLine.setAtribute('src', entry.url);
  $columnHalfOne.appendChild($imgLine);

  const $h2Element = document.createElement('h2');
  $h2Element.textContent = entry.title;
  $columnHalfTwo.appendChild($h2Element);

  const $pElement = document.createElement('p');
  $pElement.textContent = entry.description;
  $columnHalfTwo.appendChild($pElement);

  return $li;
}

// Add an anchor to the navbar to show the ”entries” view. You will need to
// create an event handler function that utilizes the viewSwap function to show
// the proper view.
const noEntriesText = document.querySelector('.no-entries');
function toggleNoEntries() {
  if (data.entries.length === 0) {

    noEntriesText.classList.remove('hidden');
  }
}

function viewSwap(view) {
  const entryForm = document.querySelector('div[data-view="entry-form"]');
  const entries = document.querySelector('div[data-view="entries"]');

  if (view === 'entry-form') {
    entryForm.classList.remove('hidden');
    entries.classList.add('hidden');
  } else if (view === 'entries') {
    entryForm.classList.add('hidden');
    entries.classList.remove('hidden');
  }
  data.view = view;
}

const $headerEntry = document.querySelector('.header-entry');
$headerEntry.addEventListener('click', function () {
  viewSwap('entries');
});

const $newButton = document.querySelector('.new-btn');
$newButton.addEventListener('click', function () {
  viewSwap('entry-form');
});

document.addEventListener('DOMContentLoaded', function () {
  toggleNoEntries();

  for (let i = 0; i < data.entries.length; i++) {
    const entry = data.entries[i];
    const entryElement = renderEntry(entry);
    entriesList.appendChild(entryElement);
  }
  viewSwap(data.view);
});

// Add an anchor to the entries view to show the entry - form.It should be
// styled like a button with the text NEW, and must match the figma.
