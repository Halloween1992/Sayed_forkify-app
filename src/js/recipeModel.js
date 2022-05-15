import { stat } from 'fs';
import { API_URL, TIMEOUT_SEC, RESULT_PER_PAGE } from './config';
import { getJson } from './helpers';
///////////////////////////////////////

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    searchResultPerPage: RESULT_PER_PAGE,
  },
};

// Load Single recipe
export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      title: recipe.title,
      source: recipe.source_url,
      publisher: recipe.publisher,
      cookingTime: recipe.cooking_time,
    };
  } catch (err) {
    console.error(err, '***');
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    const data = await getJson(`${API_URL}?search=${query}`);
    console.log(data);
    if (!data.results) throw new Error('Recipe dose not exist');
    const { recipes } = data.data;

    recipes.map(rec => {
      state.search.result.push({
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      });
    });
  } catch (err) {
    console.error(err, '***');
    throw err;
  }
};

export const searchResultPerPage = function (page = state.search.page) {
  state.search.page = page;
  console.log('PAGE:', page);
  const start = (page - 1) * 10;
  const end = page * 10;
  console.log(start, end);
  return state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
