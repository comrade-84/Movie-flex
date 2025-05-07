// Check if a user is already logged in
const loggedInUser = localStorage.getItem('loggedInUser');
if (loggedInUser) {
  // Redirect to the home page if a user is logged in
  window.location.href = '/all Html/home.html';
}



// FAQ Accordion



document.querySelectorAll('.faq-button').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) faqItem.classList.add('active');
  });
});

// Trending Movies
const trendingMovies = [
  { title: 'Inception', poster: 'https://image.tmdb.org/t/p/w200/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg' },
  { title: 'The Matrix', poster: '/images/matrix.png' },
  { title: 'Interstellar', poster: 'https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
  { title: 'Pulp Fiction', poster: 'https://image.tmdb.org/t/p/w200/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg' },
  { title: 'The Dark Knight', poster: 'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
  { title: 'Fight Club', poster: 'https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg' }
];
const trendingRow = document.getElementById('trending-row');
trendingMovies.forEach(movie => {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">
    <p>${movie.title}</p>
  `;
  trendingRow.appendChild(card);
});

// Sign-in Redirect
const signInEl = document.querySelector('.sign-in');
signInEl.addEventListener('click', function(e) {
  e.preventDefault();
  window.location.href = '/signup_login_shit/index.html';
});


// Local Storage and User Management
const getUsersFromStorage = () => {
  try {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  } catch (error) {
    console.error('Error reading from local storage:', error);
    return [];
  }
};

const saveUsersToStorage = (users) => {
  try {
    localStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving to local storage:', error);
    alert('Failed to save user data. Please try again.');
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Handle Get Started Button
const homeEmailInput = document.querySelector('.emailInput');
const getStartedBtn = document.querySelector('.g-btn');

getStartedBtn.addEventListener('click', function(e) {
  e.preventDefault();
  const trimmedInput = homeEmailInput.value.trim();

  if (!trimmedInput) {
    alert('Email input cannot be empty.');
    return;
  }

  if (!validateEmail(trimmedInput)) {
    alert('Please input a valid email address.');
    return;
  }

  const users = getUsersFromStorage();
  const emailExists = users.some(user => user.email === trimmedInput);

  if (emailExists) {
    alert('This email is already registered. Please use a different email or sign in.');
    return;
  }

  users.push({
    email: trimmedInput,
    password: '', // Placeholder; consider secure password handling in production
    plan:''
  });

  saveUsersToStorage(users);
  window.location.href = '/all Html/autenticate.html';
});
