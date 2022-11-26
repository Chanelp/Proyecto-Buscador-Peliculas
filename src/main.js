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

/*FUNCIONES REUTILIZABLES*/

function createMovies(movies, container) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    const movieContent = document.createElement("div");
    movieContent.classList.add("movie-container");
    movieContent.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

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
//Función para renderizar el preview de películas en tendencia
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

  createMovies(movies, genericSection);
}

//Función para renderizar la lista de películas en tendencia
async function getTrendingsMovies() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;

  createMovies(movies, genericSection);
}

//Función para renderizar los detalles de una peli
async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id);

  movieImgUrl = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
  headerSection.style.background = `linear-gradient(
    180deg, 
    rgba(0, 0, 0, 0.35) 19.27%, 
    rgba(0, 0, 0, 0) 29.17%
    ), url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, MovieDetailCategoryList);

  getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id){
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer)
}