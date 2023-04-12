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
});
