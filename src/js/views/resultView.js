import View from './view';
import icons from '../../img/icons.svg';

class ResulView extends View {
  _parentEl = document.querySelector('.results');
  _errMessage = 'No recipe found for  your query!, please try again';
  _message = '';

  _renderMarkup() {
    console.log(this._data);
    return this._data.map(this._renderMarkupReview).join('');
  }
  _renderMarkupReview(result) {
    return `
    <li class="preview">
        <a class="preview__link preview__link${result}--active" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            
          </div>
        </a>
    </li>
  `;
  }
}

export default new ResulView();
