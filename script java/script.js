async function submitAppointment(event) {
    event.preventDefault();
    const formData = new FormData(document.querySelector('form'));

    const response = await fetch('submit_appointment.php', {
        method: 'POST',
        body: formData
    });

    const result = await response.text();
    alert(result);
}

// Function to set the minimum date to today and minimum time to 2 hours in the future
function setMinDateTime() {
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(now.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;

    const hh = String(twoHoursFromNow.getHours()).padStart(2, '0');
    const min = String(twoHoursFromNow.getMinutes()).padStart(2, '0');
    const minTime = `${hh}:${min}`;

    document.getElementById('date').setAttribute('min', minDate);
    document.getElementById('time').setAttribute('min', minTime);

    // Update min time when date changes
    document.getElementById('date').addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate.getTime() === today.getTime()) {
            document.getElementById('time').setAttribute('min', minTime);
        } else {
            document.getElementById('time').removeAttribute('min');
        }
    });
}

function displaySuccessMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        const messageContainer = document.getElementById('message-container');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = 'Message sent successfully!';
        messageContainer.appendChild(messageDiv);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setMinDateTime();
    displaySuccessMessage();
});
