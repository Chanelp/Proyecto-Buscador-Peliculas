async function getTrendingsMoviesPreview() {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY);
  const data = await res.json();
  const movies = data.results;

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

getTrendingsMoviesPreview();
