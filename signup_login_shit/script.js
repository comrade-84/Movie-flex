// Login form validation
const logInEmail = document.querySelector('.email');
const logInPassword = document.querySelector('.password');
const loginErrorContainer = document.getElementById('loginErrorContainer');
const loginButton = document.querySelector('.btn-login'); // Assuming you have a login button
const signUpLink = document.querySelector('.showSignup');

signUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href ='/index.html';
})


const validatePassword = function (password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
const validateEmail = function(email) {
   const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
}
const ShowError = function(input, message) {
    input.classList.add('error');
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
}
const clearError = function(input) {
    input.classList.remove('error'); 
    const errorElement = input.nextElementSibling; // Get the error message element
    if (errorElement) {
        errorElement.textContent = ''; // Clear the error message
    }
};


// Function to check credentials in localStorage
const checkCredentials = (email, password) => {
    try {
        const storedUsers = localStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        // Check if any user matches the provided email and password
        const user = users.find(user => user.email === email && user.password === password);
        return user || null; // Return the user if found, otherwise null
    } catch (error) {
        console.error('Error reading users from localStorage:', error);
        return null;
    }
};

// Handle login button click
loginButton.addEventListener('click', function (e) {
    e.preventDefault();

    const email = logInEmail.value.trim();
    const password = logInPassword.value.trim();

    if (!validateEmail(email)) {
        ShowError(logInEmail, 'Please enter a valid email address');
        return;
    }else{
        clearError(logInEmail);
    }

    if (!validatePassword(password)) {
        ShowError(logInPassword, 'Password must be at least 8 characters, with 1 uppercase, 1 lowercase, and 1 number');
        return;
    }else{
        clearError(logInPassword);
    }

    const user = checkCredentials(email, password);

    if (user) {
        // Log the user in
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Save the logged-in user
        alert('Login successful!');
        window.location.href = '/all Html/home.html'; // Redirect to the home page
    } else {
        // Invalid credentials
        loginErrorContainer.textContent = 'Invalid email or password. Please try again.';
        loginErrorContainer.style.color = 'red';
    }
});