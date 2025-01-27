document.addEventListener("DOMContentLoaded", function () {
    loadReviews();

    document.querySelectorAll(".submit-review").forEach(button => {
        button.addEventListener("click", function () {
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
    reviews.push({ text, date: new Date().toLocaleString() });
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    document.querySelectorAll(".reviews-list").forEach(reviewsList => {
        reviewsList.innerHTML = "";
        reviews.forEach(review => {
            const reviewElement = document.createElement("div");
            reviewElement.className = "review-item";
            reviewElement.innerHTML = `
                <p>${review.text}</p>
                <small>${review.date}</small>
            `;
            reviewsList.appendChild(reviewElement);
        });
    });
}
