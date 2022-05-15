import View from './view';
class SearchView extends View {
  _parentEl = document.querySelector('.search');

  queerySearch() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    this._unFocusInput();
    if (!query) return;
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  _unFocusInput() {
    this._parentEl.querySelector('.search__field').blur();
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
