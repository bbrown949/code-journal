/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const localStorageData = localStorage.getItem('javascript-local-storage');

window.addEventListener('beforeunload', function (event) {
  const journalJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', journalJSON);
});
if (localStorageData !== null) {
  data = JSON.parse(localStorageData);
}
