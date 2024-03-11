// dashboard.js

document.addEventListener('DOMContentLoaded', async () => {
    // Check if code is in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // Obtener el token y el ID del usuario del almacenamiento local
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_');

    if (token && userId) {
        console.log('Token and user ID found in localStorage: ', token, userId);
        try {
            // Enviar una solicitud al servidor para obtener la información del usuario
            const response = await fetch(`https://db.edhrrz.pro/user/info/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.ok) {
                const userData = await response.json();
                const username = userData.username;
                const email = userData.email;
                const googleCode = userData.googleCode;

                console.log('User data:', userData);

                // Change the DOM, put username in all elements with class 'db-username'
                const usernameElements = document.querySelectorAll('.db-username');
                usernameElements.forEach(element => {
                    element.textContent = username;
                });

                document.getElementById('singout').addEventListener('click', async () => {
                    // End the session
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_');
                    const response = await fetch('https://db.edhrrz.pro/user/logout', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                    }).catch(error => console.error('Error:', error.message));
                    if (response.ok) {
                        console.log('Session ended');
                        // window.location.href = '/login'; *********************************************
                    } else {
                        const errorData = await response.json();
                        console.error('Error ending session:', errorData.error);
                    }
                });

                // We need to hide the linkGoogleAccountSection if the user already has a googleCode
                if (googleCode !== null && googleCode !== '') {
                    const linkGoogleAccountSection = document.getElementById('linkGoogleAccountSection');
                    linkGoogleAccountSection.classList.add('fade-out');
                    setTimeout(() => {
                        linkGoogleAccountSection.style.setProperty('display', 'none');
                        const parentLinkGoogleAccountSection = document.getElementById('parent-linkGoogle');
                        parentLinkGoogleAccountSection.classList.remove('justify-content-center', 'align-items-center');
                    }, 300);

                    console.log("Se enviará: ", googleCode);

                    if (!localStorage.getItem('googleTokens')) {
                        // Send googleCode to the backend to exchange it for a token in server
                        const response = await fetch('https://db.edhrrz.pro/user/getToken', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ code: googleCode }),
                        });

                        if (response.ok) {
                            const data = await response.json();
                            const tokens = data.tokens;
                            console.log('Tokens:', tokens);

                            // Save tokens in localStorage
                            localStorage.setItem('googleTokens', JSON.stringify(tokens));
                        } else {
                            console.error('Error getting tokens:', response.statusText);
                        }
                    }
                }


            } else {
                const errorData = await response.json();
                console.error('Error fetching user data:', errorData.error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    } else {
        console.error('Token or user ID not found in localStorage');
        // User is not logged in, redirect to login page
        // window.location.href = 'https://edhrrz.pro/pages/login.html'; →*************************************************
    }


    const linkGoogleAccountButton = document.getElementById('linkGoogleAccount');
    if (linkGoogleAccountButton) {
        linkGoogleAccountButton.addEventListener('click', async () => {
            try {
                // Send request to API server to get authorization URL
                const response = await fetch('https://api.edhrrz.pro/getLink', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const authorizationLink = data.link;

                    // Redirect user to Google authorization page
                    console.log('Redirecting to Google authorization page:', authorizationLink);

                    window.location.href = authorizationLink;
                } else {
                    console.error('Error fetching authorization link:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching authorization link:', error.message);
            }
        });
    }

    // Event listener for linking Google account    
    if (code) {
        console.log('Code found in URL:', code);
        // Update the user's googleCode in the database
        const response = await fetch('https://db.edhrrz.pro/user/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid: userId, type: 'googleCode', data: code }),
        });


        if (response.ok) {
            console.log('Code saved in database');
        } else {
            console.error('Error saving code in database:', response.statusText);
        }

        // Remove the code from the URL
        window.history.replaceState({}, document.title, window.location.pathname);
        // Then reload the page
        window.location.reload();
    } else {
        console.error('Code not found in URL');
    }

});