document.addEventListener("DOMContentLoaded", function () {
    loadReviews();

    const submitButton = document.querySelector('.submit-review');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            const reviewText = document.querySelector('.global-reviews textarea').value;
            if (reviewText.trim() === "") {
                alert("Пожалуйста, напишите отзыв.");
                return;
            }

            saveReview(reviewText);
            document.querySelector('.global-reviews textarea').value = "";
            loadReviews();
        });
    }
});

function saveReview(text) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push({ 
        text: text, 
        date: new Date().toLocaleString('ru-RU') 
    });
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const reviewsList = document.querySelector('.reviews-list');
    
    if (reviewsList) {
        reviewsList.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';
            reviewElement.innerHTML = `
                <p>${review.text}</p>
                <small>${review.date}</small>
            `;
            reviewsList.appendChild(reviewElement);
        });
    }
}
