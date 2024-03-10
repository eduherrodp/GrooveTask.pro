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
                        window.location.href = '/login';
                    } else {
                        const errorData = await response.json();
                        console.error('Error ending session:', errorData.error);
                    }
                });

            } else {
                const errorData = await response.json();
                console.error('Error fetching user data:', errorData.error);
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    } else {
        console.error('Token or user ID not found in localStorage');
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
        // If code is in the URL, save it in firebase https://db.edhrrz.pro/user/save
        console.log("USER TO MODIFY: ", userId);
        const response = await fetch('https://db.edhrrz.pro/user/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            // We also need to send uid in the URL to identify the user
            body: JSON.stringify({ type: 'googleCode', data: code }),
            params: { uid: userId }
        });

        if (response.ok) {
            console.log('Code saved in database');
        } else {
            console.error('Error saving code in database:', response.statusText);
        }

    } else {
        console.error('Code not found in URL');
    }

});
