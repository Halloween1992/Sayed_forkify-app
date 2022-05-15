import * as model from './recipeModel.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import 'regenerator-runtime';

///////////////////////////////////////
const controllerRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpiner();
    //Fetch data
    await model.loadRecipe(id);
    // Render data
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView._renderError();
  }
};

const controllerSearch = async function () {
  try {
    const query = searchView.queerySearch();
    resultView.renderSpiner();
    // Load data
    await model.loadSearchResult(query);
    // Render search result
    resultView.render(model.searchResultPerPage());
    // Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultView._renderError();
  }
};

const controllerPagination = function (goTo) {
  // Render search result
  resultView.render(model.searchResultPerPage(goTo));
  // Render new pagination
  paginationView.render(model.state.search);
};

const controllerUpdateServing = function (newServings) {
  // update servings
  model.updateServings(newServings);
  // Render the view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controllerRecipe);
  recipeView.addHandlerRecipeUpdate(controllerUpdateServing);
  searchView.addHandlerSearch(controllerSearch);
  paginationView.addHandlerClick(controllerPagination);
};
init();
