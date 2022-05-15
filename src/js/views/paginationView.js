import View from './view';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = +btn.dataset.goTo;
      handler(goTo);
    });
  }
  _renderMarkup() {
    const pageNum = Math.ceil(
      this._data.result.length / this._data.searchResultPerPage
    );
    const currentPage = this._data.page;

    // there is 1 page and others
    if (currentPage === 1 && pageNum > 1)
      return `
      <button data-goTo="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>
    `;
    // there is last page
    if (pageNum === currentPage && currentPage > 1)
      return `
        <button data-go-to="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
    `;
    // there are other pages
    if (currentPage > 1 && pageNum > currentPage)
      return `
    <button data-go-to="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
    <button data-goTo="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>page ${currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
     `;
    // there is 1 page and NO others
    if (pageNum === 1) return '';
  }
}

export default new PaginationView();
