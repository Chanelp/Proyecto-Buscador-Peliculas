//Función para renderizar la lista de películas en tendencia
async function getTrendingsMoviesPreview() {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY + "&language=es");
  const data = await res.json();
  const movies = data.results;

  //Renderizar las películas en tendencia
  movies.forEach((movie) => {
    const trendingPreviewContent = document.querySelector('#trendingPreview .trendingPreview-movieList');
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
    trendingPreviewContent.appendChild(movieContent);
  });
}

//Función para renderizar la lista de categorías
async function getCategoriesPreview() {
  const res = await fetch("https://api.themoviedb.org/3//genre/movie/list?api_key=" + API_KEY + "&language=es");
  const data = await res.json();
  const categories = data.genres;

  //Renderizar las categorías en tendencia
  categories.forEach((category) => {
    const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
    const CategoryContent = document.createElement("div");
    CategoryContent.classList.add("category-container");

    const CategoryTitle = document.createElement("h3");
    CategoryTitle.setAttribute("id", "id" + category.id);
    CategoryTitle.classList.add('category-title');
    CategoryTitle.innerText = category.name;

    CategoryContent.appendChild(CategoryTitle);
    previewCategoriesContainer.appendChild(CategoryContent);
  });
}



getTrendingsMoviesPreview();
getCategoriesPreview();
