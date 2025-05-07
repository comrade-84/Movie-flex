# Movie-flex

# MovieFlex

MovieFlex is a web-based movie streaming platform that allows users to explore, watch, and manage their favorite movies and TV shows. The platform provides a seamless user experience with features like account setup, login, personalized plans, and dynamic movie content fetched from an external API.

## Features

### 1. **User Authentication**
- **Sign Up**: Users can register with their email and set up a secure password.
- **Login**: Users can log in with their credentials to access personalized content.
- **Password Validation**: Ensures strong passwords with at least one uppercase letter, one number, and one special character.

### 2. **Account Setup**
- Multi-step account setup process:
  - Step 1: Introduction to account setup.
  - Step 2: Secure password creation.
  - Step 3: Plan selection (Basic, Standard, Premium).

### 3. **Dynamic Movie Content**
- Displays trending movies fetched from an external API (TMDb).
- Includes sections like "Continue Watching," "Popular on MovieFlex," and "Search Your Favorite Movie."
- Carousel showcasing top movies with details and play options.

### 4. **Responsive Design**
- Fully responsive layout using Bootstrap 5.
- Optimized for viewing on desktops, tablets, and mobile devices.

### 5. **Local Storage Integration**
- User data (email, password, and selected plan) is securely stored in the browser's local storage.
- Logged-in user sessions are maintained until the user logs out.

### 6. **Interactive Features**
- FAQ accordion for common questions.
- Search functionality to find movies quickly.
- Modal pop-ups for detailed movie information.

## Project Structure
Movie-flex/ ├── all css/ # CSS files for styling │ ├── autenticate.css # Styles for account setup page │ ├── home.css # Styles for the home page │ ├── style.css # General styles for the platform ├── all Html/ # HTML files for different pages │ ├── autenticate.html # Account setup page │ ├── home.html # Home page ├── all script/ # JavaScript files for functionality │ ├── home.js # Script for the home page │ ├── script.js # General script for the platform ├── images/ # Image assets ├── signup_login_shit/ # Login and signup-related files │ ├── index.html # Login page │ ├── script.js # Script for login functionality │ ├── style.css # Styles for login and signup ├── data.json # Sample movie data ├── index.html # Landing page ├── .vscode/ # VS Code settings │ ├── settings.json # Live server configuration └── README.md # Project documentation

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Frameworks**: Bootstrap 5
- **API**: TMDb (The Movie Database) for fetching movie data
- **Storage**: Local Storage for user data management

## How to Run the Project

1. Clone the repository to your local machine.
2. Open the project folder in Visual Studio Code.
3. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
4. Start the live server by right-clicking on `index.html` and selecting "Open with Live Server."
5. Access the application in your browser at `http://127.0.0.1:5501`.

## Future Enhancements

- Add a backend for secure user authentication and data storage.
- Implement a subscription payment system.
- Enhance the search functionality with filters for genres, ratings, etc.
- Add support for user profiles and watchlists.

## Credits

- **TMDb API**: For providing movie data.
- **Bootstrap**: For responsive design and UI components.

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.