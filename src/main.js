const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  params: {
    api_key: API_KEY,
    language: "es-ES",
  },
});

/*UTILS*/

function createMovies(movies, container) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    const movieContent = document.createElement("div");
    movieContent.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300/" + movie.poster_path
    );

    movieImg.setAttribute("alt", "Imagen de la peli");
    movieImg.classList.add("movie-img");

    movieContent.appendChild(movieImg);
    container.appendChild(movieContent);
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const CategoryContent = document.createElement("div");
    CategoryContent.classList.add("category-container");

    const CategoryTitle = document.createElement("h3");
    CategoryTitle.classList.add("category-title");
    CategoryTitle.setAttribute("id", "id" + category.id);
    CategoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    CategoryTitle.appendChild(categoryTitleText);
    CategoryContent.appendChild(CategoryTitle);
    container.appendChild(CategoryContent);
  });
}

/*LLAMADOS A LA API*/
//Función para renderizar la lista de películas en tendencia
async function getTrendingsMoviesPreview() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;

  //Renderizar las películas en tendencia
  createMovies(movies, trendingMoviesPreviewList);
}

//Función para renderizar la lista de categorías
async function getCategoriesPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;

  //Renderizar las categorías en tendencia - categoriesPreviewList
  createCategories(categories, categoriesPreviewList);
}

//Función para filtrar películas por categoría
async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  
  const movies = data.results;
  
  //Renderizar las películas por categoría
  createMovies(movies, genericSection);
}

//Función para filtrar películas por busqueda
async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;

  //Renderizar las películas por categoría
  createMovies(movies, genericSection);
}

//getTrendingsMoviesPreview();
//getCategoriesPreview();
