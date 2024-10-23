// Event listeners for toggling between forms
document.getElementById('signup-link').addEventListener('click', function() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'flex';
});
  
document.getElementById('forgot-password-link').addEventListener('click', function() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('forgot-password').style.display = 'flex';
});
  
// Password strength calculation function
function calculatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength += 20; // Length
    if (/[A-Z]/.test(password)) strength += 20; // Uppercase letter
    if (/[a-z]/.test(password)) strength += 20; // Lowercase letter
    if (/[0-9]/.test(password)) strength += 20; // Number
    if (/[^A-Za-z0-9]/.test(password)) strength += 20; // Special character

    return strength;
}

// Update password strength and matching status
const passwordInput = document.querySelector('.signup .inputBox input[type="password"]');
const confirmPasswordInput = document.querySelectorAll('.signup .inputBox input[type="password"]')[1];
const errorMessageContainer = document.querySelector('.confirm-password-error');

// Function to update strength and matching status
function updatePasswordStrengthAndMatching() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const strengthPercentage = calculatePasswordStrength(password);
    const strengthIndicator = document.querySelector('.password-strength');

    // Update password strength
    strengthIndicator.style.display = 'block'; // Show the indicator
    if (strengthPercentage <= 30) {
        strengthIndicator.textContent = `Strength: ${strengthPercentage}% (Weak)`;
        strengthIndicator.style.color = 'red';
    } else if (strengthPercentage <= 60) {
        strengthIndicator.textContent = `Strength: ${strengthPercentage}% (Medium)`;
        strengthIndicator.style.color = 'orange';
    } else {
        strengthIndicator.textContent = `Strength: ${strengthPercentage}% (Strong)`;
        strengthIndicator.style.color = 'green';
    }

    // Check if confirm password field is being typed into
    if (document.activeElement === confirmPasswordInput) {
        // Check if passwords match
        if (password !== confirmPassword) {
            confirmPasswordInput.style.border = '2px solid red';  // Add red border for mismatch
            errorMessageContainer.textContent = "Passwords don't match";
            errorMessageContainer.style.color = 'red';
            errorMessageContainer.style.display = 'block'; // Show the error message
        } else {
            confirmPasswordInput.style.border = '';  // Reset border
            errorMessageContainer.style.display = 'none'; // Hide the error message
        }
    }
}

// Listen for input events on both password fields
passwordInput.addEventListener('input', function() {
    updatePasswordStrengthAndMatching();
});

confirmPasswordInput.addEventListener('input', function() {
    updatePasswordStrengthAndMatching();
});

// Submit event listener
document.querySelector('.signup .inputBox input[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent form submission for validation

    const inputs = document.querySelectorAll('.signup .inputBox input');
    let isValid = true;

    // Check if any input field is empty
    inputs.forEach((input) => {
        if (!input.value) {
            input.style.border = '2px solid red';  // Add red border if empty
            isValid = false;
        }
    });

    // Check if passwords match one last time before submission
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.style.border = '2px solid red';  // Add red border for mismatch
        errorMessageContainer.textContent = "Passwords don't match";
        errorMessageContainer.style.color = 'red';
        errorMessageContainer.style.display = 'block'; // Show the error message
        isValid = false;
    }

    // If valid, proceed to submit
    if (isValid) {
        alert('Account created successfully!');
        // Reset the signup form and go back to the login form
        inputs.forEach(input => input.value = ''); // Clear input fields
        errorMessageContainer.textContent = ''; // Clear error messages
        errorMessageContainer.style.display = 'none'; // Hide the error message
        document.getElementById('signup').style.display = 'none';
        document.getElementById('login').style.display = 'flex';
    }
});

// Forgot password email suggestion feature
const emailInput = document.querySelector('.forgot-password .inputBox input[type="text"]');
const emailDomains = ['@gmail.com', '@yahoo.com', '@apple.com'];
const dropdownContainer = document.createElement('div');
dropdownContainer.classList.add('email-dropdown'); // Add styles in your CSS
emailInput.parentNode.appendChild(dropdownContainer);

emailInput.addEventListener('input', function() {
    const inputValue = emailInput.value;
    dropdownContainer.innerHTML = ''; // Clear previous suggestions

    if (inputValue.includes('@')) {
        const baseEmail = inputValue.split('@')[0];
        emailDomains.forEach(domain => {
            const suggestion = baseEmail + domain;
            const div = document.createElement('div');
            div.textContent = suggestion;
            div.addEventListener('click', function() {
                emailInput.value = suggestion; // Fill the input with the selected suggestion
                dropdownContainer.innerHTML = ''; // Clear dropdown
            });
            dropdownContainer.appendChild(div);
        });
    }

    if (dropdownContainer.childNodes.length > 0) {
        dropdownContainer.style.display = 'block'; // Show dropdown
    } else {
        dropdownContainer.style.display = 'none'; // Hide dropdown
    }
});

// Validation for the forgot password email
document.querySelector('.forgot-password .inputBox input[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault();
    const email = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Simple email pattern
    const errorMessageContainer = document.querySelector('.forgot-password .error-message');

    // Clear previous errors
    emailInput.style.border = '';
    errorMessageContainer.textContent = '';
    errorMessageContainer.style.display = 'none';

    // Validate email
    if (!emailPattern.test(email)) {
        emailInput.style.border = '2px solid red';  // Add red border if invalid
        errorMessageContainer.textContent = "Invalid email address";
        errorMessageContainer.style.color = 'red';
        errorMessageContainer.style.display = 'block'; // Show error message
    } else {
        alert('Password reset email sent.');
        document.getElementById('forgot-password').style.display = 'none';
        document.getElementById('login').style.display = 'flex';
    }
});
