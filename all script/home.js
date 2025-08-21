
// Function to create movie card
function createMovieCard(movie) {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const wordCount = movie.title.trim().split(/\s+/).length;
  const displayTitle = wordCount > 2 
    ? movie.title.split(' ').slice(0, 2).join(' ') + '...'
    : movie.title;

  return `
    <div class="col-md-3 mb-4">
      <div class="movie-card h-100 d-flex flex-column">
        <div class="position-relative">
          <img src="${posterUrl}" alt="${movie.title}" class="img-fluid w-100" style="border-radius: 8px; object-fit: cover;">
          <h5 class="text-center my-2 px-2" style="min-height: 48px; overflow: hidden;" title="${movie.title}">
            ${displayTitle}
          </h5>
        </div>
        <div class="mt-auto">
          <p class="btn btn-primary m-2 d-block details" data-bs-toggle="modal" data-bs-target="#movieModal" 
             data-title="${movie.title}" data-overview="${movie.overview}" data-movie-id="${movie.id}">View Details</p>
        </div>
      </div>
    </div>
  `;
}

// Populate Continue Watching
async function populateContinueWatching() {
  const continueWatchingContainer = document.getElementById("continue-watching");
  try {
    const apiKey = '41b17bf7e61f8e145d97b9276549e8a5';
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    const firstThreeMovies = data.results.slice(0, 3);
    
    continueWatchingContainer.innerHTML = '<div class="row">';
    firstThreeMovies.forEach((movie) => {
      continueWatchingContainer.querySelector('.row').innerHTML += createMovieCard(movie);
    });
    continueWatchingContainer.innerHTML += '</div>';
  } catch (error) {
    console.error('Error fetching continue watching movies:', error);
  }
}

// Populate Popular Movies
async function populatePopularMovies() {
  const popularMoviesContainer = document.getElementById("popular-movies");
  try {
    const apiKey = '41b17bf7e61f8e145d97b9276549e8a5';
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();
    const firstSixMovies = data.results.slice(0, 6);
    
    popularMoviesContainer.innerHTML = '<div class="row">';
    firstSixMovies.forEach((movie) => {
      popularMoviesContainer.querySelector('.row').innerHTML += createMovieCard(movie);
    });
    popularMoviesContainer.innerHTML += '</div>';
  } catch (error) {
    console.error('Error fetching popular movies:', error);
  }
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
    favouriteContainer.innerHTML = '<div class="row">';
    results.forEach(movie => {
      const wordCount = movie.title.trim().split(/\s+/).length;
      const displayTitle = wordCount > 2 
        ? movie.title.split(' ').slice(0, 2).join(' ') + '...'
        : movie.title;
      const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      
      const movieCard = `
        <div class="col-md-3 mb-4">
          <div class="movie-card h-100 d-flex flex-column">
            <div class="position-relative">
              <img src="${posterUrl}" alt="${movie.title}" class="img-fluid w-100" style="border-radius: 8px; object-fit: cover;">
              <h5 class="text-center my-2 px-2" style="min-height: 48px; overflow: hidden;" title="${movie.title}">
                ${displayTitle}
              </h5>
            </div>
            <div class="mt-auto">
              <p class="btn btn-primary m-2 d-block details" data-bs-toggle="modal" data-bs-target="#movieModal" 
                 data-title="${movie.title}" data-overview="${movie.overview}" data-movie-id="${movie.id}">View Details</p>
            </div>
          </div>
        </div>
      `;
      favouriteContainer.querySelector('.row').innerHTML += movieCard;
    });
    favouriteContainer.innerHTML += '</div>';
  } catch (error) {
    console.error('Error fetching or displaying movies:', error);
    populateContinueWatching();
    populatePopularMovies();
  }
}



        // Fetch video link from TMDb
        async function fetchVideoLink(movieId) {
          const apiKey = '41b17bf7e61f8e145d97b9276549e8a5'; 
          if (!apiKey) {
              console.warn('TMDb API key is missing. Please provide a valid API key.');
              return null;
          }
          try {
              const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`);
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}, Message: ${await response.text()}`);
              }
              const data = await response.json();
              console.log(`Video data for movie ID ${movieId}:`, data);
              const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
              if (trailer) {
                  const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
                  console.log(`Trailer URL for movie ID ${movieId}: ${trailerUrl}`);
                  return trailerUrl;
              }
              console.log(`No YouTube trailer found for movie ID ${movieId}`);
              return null;
          } catch (error) {
              console.error('Error fetching video link:', {
                  movieId,
                  message: error.message,
                  stack: error.stack
              });
              return null;
          }
      }
     // Modal Event Listener
     document.addEventListener('DOMContentLoaded', () => {
      populateContinueWatching();
      populatePopularMovies();
      populateRest();

      // Handle View Details clicks
      document.getElementById('favourite-movies').addEventListener('click', async (e) => {
          if (e.target.classList.contains('details')) {
              const title = e.target.getAttribute('data-title');
              const overview = e.target.getAttribute('data-overview');
              const movieId = e.target.getAttribute('data-movie-id');
              document.getElementById('modalMovieTitle').textContent = title;
              document.getElementById('modalMovieOverview').textContent = overview;
              const trailerEl = document.getElementById('modalMovieTrailer');
              trailerEl.textContent = 'Loading trailer...';
              const trailer = await fetchVideoLink(movieId);
              trailerEl.innerHTML = trailer
                  ? `<div class="ratio ratio-16x9">
                       <iframe src="${trailer}" title="Movie Trailer" allowfullscreen class="embed-responsive-item"></iframe>
                     </div>`
                  : 'No trailer available';
          }
      });
  });


  const viewProfile = document.getElementById('viewProfile');
  viewProfile.addEventListener('click', function(e){
    e.preventDefault();
    alert(`Email: ${loggedInUser.email}\nPlan: ${loggedInUser.plan}`);
  })


  const logoutEl = document.getElementById('logout');
  logoutEl.addEventListener('click', signOut);
// Sign Out function
function signOut() {
  alert('you have been logged out');
  alert('redirecting you to login page');
  localStorage.removeItem("loggedInUser");
  window.location.href = "/signup_login_shit/index.html";
}

// Greeter
const greeterEl = document.getElementById('greeter');
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (loggedInUser) {
  const date = new Date().getHours();
  greeterEl.innerHTML = `Good ${date <= 18 ? 'Day 🌤️' : 'Evening🌃'} ${loggedInUser.email}`;
}
