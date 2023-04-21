const entriesList = document.querySelector('#entries');
const $photoURL = document.querySelector('.url');
const $imagePlaceholder = document.querySelector('.image-placeholder');
const entryImagePlaceholder = 'images/placeholder-image-square.jpg';
const entryForm = document.querySelector('div[data-view="entry-form"]');
const entries = document.querySelector('div[data-view="entries"]');
const $entryFormText = document.querySelector('#new-entry-edit-entry');
// change below
const $form = document.querySelector('form');
// bs FINE NOW
const $idTitle = document.getElementById('new-entry-edit-entry');

$photoURL.addEventListener('input', function (event) {
  $imagePlaceholder.setAttribute('src', event.target.value);
});

// const $entryForm = document.querySelector('form');
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.editing === null) {
    $imagePlaceholder.setAttribute('src', entryImagePlaceholder);
    const singleData = {
      title: $form.elements.title.value,
      comment: $form.elements.notes.value,
      url: $form.elements.url.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(singleData);
    $imagePlaceholder.setAttribute('src', entryImagePlaceholder);
    $form.reset();

    // const $renderEntry = renderEntry(singleData);
    entriesList.prepend(renderEntry(singleData));
    viewSwap('entries');
  } else {
    data.editing.title = event.target.elements.title.value;
    data.editing.comment = event.target.elements.notes.value;
    data.editing.url = event.target.elements.url.value;
    const $editedEntry = renderEntry(data.editing);
    const $li = document.querySelectorAll('li');
    for (let i = 0; i < $li.length; i++) {
      if (Number($li[i].getAttribute('data-entry-id')) === data.editing.entryId) {
        $li[i].replaceWith($editedEntry);
      }
    }
    viewSwap('entries');
    $form.reset();
    $imagePlaceholder.setAttribute('src', entryImagePlaceholder);
    data.editing = null;
  }

});

function renderEntry(entry) {
  const $li = document.createElement('li');
  // Add a data-entry-id attribute to the li that stores the entryId of the entry being rendered.
  $li.setAttribute('data-entry-id', entry.entryId);

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $li.appendChild($row);

  const $columnHalfOne = document.createElement('div');
  $columnHalfOne.setAttribute('class', 'column-half');
  $row.appendChild($columnHalfOne);

  const $columnHalfTwo = document.createElement('div');
  $columnHalfTwo.setAttribute('class', 'column-half');
  $row.appendChild($columnHalfTwo);

  const $imgLine = document.createElement('img');
  $imgLine.setAttribute('src', entry.url);
  $columnHalfOne.appendChild($imgLine);
  // pencil start
  const $iconContainer = document.createElement('div');
  $iconContainer.className = 'title-icon-container';
  $columnHalfTwo.appendChild($iconContainer);

  const $h2Element = document.createElement('h2');
  $h2Element.textContent = entry.title;
  // pencil next
  $iconContainer.appendChild($h2Element);

  const $iconElement = document.createElement('i');
  $iconElement.className = 'fa fa-pencil edit - icon';
  $h2Element.appendChild($iconElement);

  const $pElement = document.createElement('p');
  $pElement.textContent = entry.comment;
  $columnHalfTwo.appendChild($pElement);

  $li.setAttribute('data-entry-id', entry.entryId);

  return $li;
}

const noEntriesText = document.querySelector('.no-entries');
function toggleNoEntries() {
  if (data.entries.length === 0) {

    noEntriesText.classList.remove('hidden');
  }
}

function viewSwap(view) {

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
  $entryFormText.textContent = 'New Entry';
  data.editing = null;
  viewSwap('entries');

});

const $newButton = document.querySelector('.new-btn');
$newButton.addEventListener('click', function () {

  // $entryForm.reset();

  data.editing = null;
  viewSwap('entry-form');

  $idTitle.textContent = 'New Entry';
});

document.addEventListener('DOMContentLoaded', function () {
  toggleNoEntries();

  /// /Update the entry form's submit handler to do the following:here i think below

  for (let i = 0; i < data.entries.length; i++) {
    const entry = data.entries[i];
    const entryElement = renderEntry(entry);
    entriesList.appendChild(entryElement);
  }
  viewSwap(data.view);
});

const $ul = document.querySelector('ul');

//  added event listener to ul to show pre-populated form of the ul that …
$ul.addEventListener('click', function (event) {
  const $closestLi = event.target.closest('li');
  if (!event.target.matches('i')) {
    return null;
  } else {
    for (let i = 0; i < data.entries.length; i++) {
      if (Number($closestLi.getAttribute('data-entry-id')) === data.entries[i].entryId) {
        data.editing = data.entries[i];
      }
      $form.elements.title.value = data.editing.title;
      $form.elements.url.value = data.editing.url;
      $form.elements.notes.value = data.editing.comment;
      $imagePlaceholder.setAttribute('src', data.editing.url);
      $entryFormText.textContent = 'Edit Entry';

      viewSwap('entry-form');
    }
  }
});
