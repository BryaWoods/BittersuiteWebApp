document.addEventListener('DOMContentLoaded', () => {
    // Function to show the password input form
    window.showPasswordInput = function() {
        document.getElementById('password-container').classList.remove('hidden');
        document.getElementById('logo-container').classList.add('hidden');
    }

    // Function to check the password (you can customize this function as needed)
    window.checkPassword = function() {
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        if (password === 'TrueBlue') {
            window.location.href = 'index.html'; // Redirect to the home page
        } else {
            errorMessage.textContent = 'Incorrect password. Please try again.';
        }
    }

    // Add keypress event listener to submit the form when Enter is pressed
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action (if any)
            window.checkPassword(); // Call the checkPassword function
        }
    });
});

