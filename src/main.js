const api = axios.create({
  baseURL : 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  params: {
    'api_key': API_KEY,
    "language": "es-ES"
  },
});

//Función para renderizar la lista de películas en tendencia  
async function getTrendingsMoviesPreview() {
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  trendingMoviesPreviewList.innerHTML = "";

  //Renderizar las películas en tendencia
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
    trendingMoviesPreviewList.appendChild(movieContent);
  });
}

//Función para renderizar la lista de categorías
async function getCategoriesPreview() {
  const { data } = await api('genre/movie/list');
  const categories = data.genres;

  categoriesPreviewList.innerHTML = "";

  //Renderizar las categorías en tendencia
  categories.forEach((category) => {
    const CategoryContent = document.createElement("div");
    CategoryContent.classList.add("category-container");

    const CategoryTitle = document.createElement("h3");
    CategoryTitle.setAttribute("id", "id" + category.id);
    CategoryTitle.classList.add('category-title');
    CategoryTitle.innerText = category.name;

    CategoryContent.appendChild(CategoryTitle);
    categoriesPreviewList.appendChild(CategoryContent);
  });
}

//getTrendingsMoviesPreview();
//getCategoriesPreview();
