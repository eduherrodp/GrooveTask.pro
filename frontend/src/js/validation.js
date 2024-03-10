/**
 * Represents a form validation utility.
 * @class
 */
class Validation {
    /**
     * Creates an instance of Validation.
     * @constructor
     * @param {string} formId - The ID of the form element to validate.
     */
    constructor(formId) {
        /**
         * The form element to validate.
         * @type {HTMLFormElement}
         */
        this.form = document.getElementById(formId);
        this.init();
    }

    /**
     * Initializes the form validation.
     * @private
     */
    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    /**
     * Handles the form submission event.
     * @param {Event} event - The submit event.
     */
    async handleSubmit(event) {
        event.preventDefault();

        const isValid = this.validateForm();

        if (isValid) {
            // Performance to send the form data to the server (https://db.edhrrz.pro)
            const formData = new FormData(event.target);
            const formObject = {};

            // Convert FormData to an object
            for (const [key, value] of formData.entries()) {
                formObject[key] = value;
            }

            try {
                const response = await fetch('https://db.edhrrz.pro/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formObject)
                });

                const data = await response.json();
                console.log('User registered:', data.user);

                // Here we can redirect the user to the login page because the registration was successful

                // Redirect to the login page
                window.location.href = '/pages/login.html';
            } catch (error) {
                console.error('Error registering user:', error.message);
            }
            // Do not submit the form 'cause we're using fetch to send the data to the server (https://db.edhrrz.pro)
            // event.target.submit();
        }
    }

    /**
     * Validates the entire form.
     * @returns {boolean} - True if the form is valid, false otherwise.
     */
    validateForm() {
        let isValid = true;

        isValid = this.validateUsername() && isValid;
        isValid = this.validateEmail() && isValid;
        isValid = this.validatePassword() && isValid;
        isValid = this.validateConfirmPassword() && isValid;
        isValid = this.validateTerms() && isValid;

        return isValid;
    }

    /**
     * Validates the username field.
     * @returns {boolean} - True if the username is valid, false otherwise.
     */
    validateUsername() {
        const usernameInput = this.form.querySelector('#username');
        const usernameError = this.form.querySelector('#usernameError');

        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'Please enter your username.';
            return false;
        } else {
            usernameError.textContent = '';
            return true;
        }
    }

    /**
     * Validates the email field.
     * @returns {boolean} - True if the email is valid, false otherwise.
     */
    validateEmail() {
        const emailInput = this.form.querySelector('#email');
        const emailError = this.form.querySelector('#emailError');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    /**
     * Validates the password field.
     * @returns {boolean} - True if the password is valid, false otherwise.
     */
    validatePassword() {
        const passwordInput = this.form.querySelector('#password');
        const passwordError = this.form.querySelector('#passwordError');

        if (passwordInput.value.trim().length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }

    /**
     * Validates the confirm password field.
     * @returns {boolean} - True if the confirm password is valid, false otherwise.
     */
    validateConfirmPassword() {
        const passwordInput = this.form.querySelector('#password');
        const confirmPasswordInput = this.form.querySelector('#confirmPassword');
        const confirmPasswordError = this.form.querySelector('#confirmPasswordError');

        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            return false;
        } else {
            confirmPasswordError.textContent = '';
            return true;
        }
    }

    /**
     * Validates the terms and conditions checkbox.
     * @returns {boolean} - True if the terms are accepted, false otherwise.
     */
    validateTerms() {
        const agreeTermsCheckbox = this.form.querySelector('#agreeTerms');
        const agreeTermsError = this.form.querySelector('#agreeTermsError');

        if (!agreeTermsCheckbox.checked) {
            agreeTermsError.textContent = 'You must agree to the terms and conditions.';
            return false;
        } else {
            agreeTermsError.textContent = '';
            return true;
        }
    }
}

// Create an instance of Validation when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const validation = new Validation('signupForm');
});