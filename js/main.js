const entriesList = document.querySelector('#entries');
const $photoURL = document.querySelector('.url');
const $imagePlaceholder = document.querySelector('.image-placeholder');
const entryImagePlaceholder = 'images/placeholder-image-square.jpg';
const entryForm = document.querySelector('div[data-view="entry-form"]');
const entries = document.querySelector('div[data-view="entries"]');
const $entryFormText = document.querySelector('#new-entry-edit-entry');
const $form = document.querySelector('form');
const $idTitle = document.getElementById('new-entry-edit-entry');
const $deleteButton = document.querySelector('.delete-button');

$photoURL.addEventListener('input', function (event) {
  $imagePlaceholder.setAttribute('src', event.target.value);
});

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

    entriesList.prepend(renderEntry(singleData));
    toggleNoEntries();
    viewSwap('entries');
  } else {
    const singleData = {
      title: $form.elements.title.value,
      comment: $form.elements.notes.value,
      url: $form.elements.url.value,
      entryId: data.editing.entryId
    };
    for (let k = 0; k < data.entries.length; k++) {
      if (data.entries[k].entryId === data.editing.entryId) {
        data.entries[k] = singleData;
      }
    }
    const $editedEntry = renderEntry(singleData);
    const $li = document.querySelectorAll('li');
    for (let i = 0; i < $li.length; i++) {
      if (Number($li[i].getAttribute('data-entry-id')) === data.editing.entryId) {
        $li[i].replaceWith($editedEntry);

      }
    }
    viewSwap('entries');
    $form.reset();
    // issue 4 commit 1 CC
    $deleteButton.className = 'delete-button hide';
    // issue 4 commit 1 CC
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
  } else {
    noEntriesText.classList.add('hidden');
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
  $deleteButton.className = 'delete-button';
  viewSwap('entries');
  $form.reset();

});

const $newButton = document.querySelector('.new-btn');
$newButton.addEventListener('click', function () {
  $deleteButton.className = 'delete-button hidden';
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
  $deleteButton.className = 'delete-button hide';
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

      $deleteButton.className = 'delete-button';
    }
  }
});

// modal below
const $deleteBtn = document.querySelector('.delete-button');
const $popupModal = document.querySelector('.delete-entry-background');
$deleteBtn.addEventListener('click', $deleteEntryPopup);
function $deleteEntryPopup() {
  $popupModal.className = 'delete-entry-background';
}

// When the user clicks Cancel, hide the modal.
const $cancelBtn = document.querySelector('.dlt-btn-cancel');
$cancelBtn.addEventListener('click', $cancelDelete);
function $cancelDelete() {
  $popupModal.className = 'delete-entry-background hide';
}

//

const $confirmDeleteBtn = document.querySelector('.dlt-btn-confirm');
$confirmDeleteBtn.addEventListener('click', $confirmDeletion);
function $confirmDeletion() {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(data.entries[i], 1);
      $popupModal.className = 'delete-entry-background hide';

      const $allLiElements = document.querySelectorAll('li');
      for (let k = 0; k < $allLiElements.length; k++) {
        if (Number($allLiElements[k].getAttribute('data-entry-id')) === data.editing.entryId) {
          $allLiElements[k].remove();
        }
      }
      toggleNoEntries();
      $form.reset();
      $imagePlaceholder.setAttribute('src', 'images/placeholder-image-square.jpg');
      viewSwap('entries');
      data.editing = null;
    }
  }
}
