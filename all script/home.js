
// Movie data
const movies = [
  {
    title: "The Matrix",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  },
  {
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  },
];

// Function to create movie card
function createMovieCard(movie) {
  return `
    <div class="movie-card mx-2">
      <img src="${movie.poster}" alt="${movie.title}" class="img-fluid" style="width: 200px; border-radius: 8px;">
      <p class="btn btn-primary m-2 d-block">View Details</p>
      <p class="btn btn-success m-2 d-block">Download</p>
    </div>
  `;
}

// Populate Continue Watching
function populateContinueWatching() {
  const continueWatchingContainer = document.getElementById("continue-watching");
  movies.slice(0, 3).forEach((movie) => {
    continueWatchingContainer.innerHTML += createMovieCard(movie);
  });
}

// Populate Popular Movies
function populatePopularMovies() {
  const popularMoviesContainer = document.getElementById("popular-movies");
  movies.forEach((movie) => {
    popularMoviesContainer.innerHTML += createMovieCard(movie);
  });
}

// Populate Carousel and Favorite Movies
async function populateRest() {
  try {
  
    const apiKey = '41b17bf7e61f8e145d97b9276549e8a5';
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
  
    // const response = await fetch('/data.json');
    const data = await response.json();
    const results = data.results;

    // Populate Carousel
    const carouselItems = document.querySelectorAll('.carousel-item');
    const firstThreeVideos = results.slice(0, 3);
    carouselItems.forEach((item, index) => {
      if (firstThreeVideos[index]) {
        const posterUrl = `https://image.tmdb.org/t/p/w1280${firstThreeVideos[index].backdrop_path || firstThreeVideos[index].poster_path}`;
        item.innerHTML = `
          <img class="d-block rounded small " src="${posterUrl}" class="d-block w-100" alt="${firstThreeVideos[index].title}">
          <div class="small d-none d-md-block">
            <h5 class="text-center">${firstThreeVideos[index].title}</h5>
            <p class=''>${firstThreeVideos[index].overview}...</p>
            <p class="small btn btn-success d-inline-block">Play Now</p>
          </div>
        `;
      }
    });

    // Populate Favorite Movies
    const favouriteContainer = document.getElementById('favourite-movies');
    results.forEach(movie => {
      const movieCard = document.createElement('div');
      movieCard.classList.add('restCard', 'border', 'p-2', 'm-2', 'rounded');
      const posterUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
      movieCard.innerHTML = `
        <img class="d-block m-auto rounded-top" src="${posterUrl}" alt="${movie.title}" />
        <h3 class="text-center mt-2">${movie.title}</h3>
        <p class="d-none">${movie.overview}</p>
        <p class="btn btn-primary m-2 d-block details" data-bs-toggle="modal" data-bs-target="#movieModal" data-title="${movie.title}" data-overview="${movie.overview}">View Details</p>
        <p class="btn btn-success m-2 d-block">Download</p>
      `;
      favouriteContainer.appendChild(movieCard);
    });
  } catch (error) {
    console.error('Error fetching or displaying movies:', error);
    populateContinueWatching();
    populatePopularMovies();
  }
}

// Modal Event Listener
document.addEventListener('DOMContentLoaded', () => {
  populateContinueWatching();
  populatePopularMovies();
  populateRest();

  // Handle View Details clicks
  document.getElementById('favourite-movies').addEventListener('click', (e) => {
    if (e.target.classList.contains('details')) {
      const title = e.target.getAttribute('data-title');
      const overview = e.target.getAttribute('data-overview');
      document.getElementById('modalMovieTitle').textContent = title;
      document.getElementById('modalMovieOverview').textContent = overview;
    }
  });
});

// Sign Out function
function signOut() {
  localStorage.removeItem("user");
  window.location.href = "/signup_login_shit/index.html";
}

// Greeter
const greeterEl = document.getElementById('greeter');
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUser) {
  const date = new Date().getHours();
  greeterEl.innerHTML = `Good ${date <= 18 ? 'Day 🌤️' : 'Evening🌃'} ${loggedInUser.email}`;
}
