document.addEventListener("DOMContentLoaded", function () {
    loadReviews();

    const submitButtons = document.querySelectorAll('.lv-review-submit');
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const reviewText = this.previousElementSibling.value;
            if (reviewText.trim() === "") {
                alert("Пожалуйста, напишите отзыв.");
                return;
            }

            saveReview(reviewText);
            this.previousElementSibling.value = "";
            loadReviews();
        });
    });
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
    const reviewsList = document.querySelector('.lv-reviews-list');
    
    if (reviewsList) {
        reviewsList.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'lv-review-item';
            reviewElement.innerHTML = `
                <p>"${review.text}"</p>
                <small>${review.date}</small>
            `;
            reviewsList.appendChild(reviewElement);
        });
    }
}
