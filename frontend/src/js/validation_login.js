// validation_login.js

class Validation {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
    
        const isValid = this.validateForm();
    
        if (isValid) {
            const formData = new FormData(event.target);
            const formObject = {};
    
            for (const [key, value] of formData.entries()) {
                formObject[key] = value;
            }
    
            try {
                const response = await fetch('https://db.edhrrz.pro/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formObject),
                    credentials: 'include' // Send cookies
                });
                
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user_', data.user_);
    
                    // Redirigir a la página de dashboard
                    window.location.href = 'https://www.edhrrz.pro/pages/dashboard.html';
                } else {
                    const errorData = await response.json();
                    console.error('Error logging in user:', errorData.error);
                    // Manejar el error y mostrar un mensaje al usuario si es necesario
                }
            } catch (error) {
                console.error('Error logging in user:', error.message);
                // Manejar el error y mostrar un mensaje al usuario si es necesario
            }
        }
    }    

    validateForm() {
        let isValid = true;

        isValid = this.validateEmail() && isValid;
        isValid = this.validatePassword() && isValid;

        return isValid;
    }

    validateEmail() {
        const emailInput = this.form.querySelector('#email');
        const emailError = this.form.querySelector('#emailError');

        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Por favor ingresa tu correo electrónico.';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    validatePassword() {
        const passwordInput = this.form.querySelector('#password');
        const passwordError = this.form.querySelector('#passwordError');

        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Por favor ingresa tu contraseña.';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const validation = new Validation('loginForm');
});
