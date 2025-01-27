document.addEventListener("DOMContentLoaded", function () {
    loadReviews();

    document.querySelectorAll(".submit-review").forEach(button => {
        button.addEventListener("click", function () {
            const reviewText = this.previousElementSibling.value;
            if (reviewText.trim() === "") {
                alert("Пожалуйста, напишите отзыв.");
                return;
            }

            const productId = this.closest(".product").dataset.productId;
            saveReview(productId, reviewText);
            this.previousElementSibling.value = "";
            loadReviews();
        });
    });
});

function saveReview(productId, text) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push({ productId, text, date: new Date().toLocaleString() });
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    document.querySelectorAll(".product").forEach(product => {
        const productId = product.dataset.productId;
        const reviewsList = product.querySelector(".reviews-list");
        reviewsList.innerHTML = "";

        reviews.filter(review => review.productId === productId).forEach(review => {
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