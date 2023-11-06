function addReview() {
    const prodoctName = document.getElementById("product-name").value;
    const reviewText = document.getElementById("review-text").value;

    if (prodoctName && reviewText) {
        const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
        existingReviews.push({ prodoctName, reviewText });
        localStorage.setItem( "reviews", JSON.stringify(existingReviews));

        document.getElementById("product-name").value = "";
        document.getElementById("review-text").value = "";
        alert("Review is success!")
    }
    else {
        alert("Please, fill in all fields before adding a review")
    }
}

function displayProducts() {
    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
  
    const products = [
      ...new Set(existingReviews.map((review) => review.productName)),
    ];
  
    for (const product of products) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="#" class="product-link">${product}</a>`;
      productList.appendChild(listItem);
  
      // Добавить обработчик событий для перехода к отзывам по продукту
      listItem.querySelector(".product-link").addEventListener("click", () => {
        displayReviewsForProduct(product);
      });
    }
}

function displayReviewsForProduct(productName) {
    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const reviewList = document.getElementById("product-list");
    reviewList.innerHTML = "";
  
    for (const review of existingReviews) {
        if (review.productName === productName) {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${review.reviewText} <button class="delete-review">Удалить</button>`;
            reviewList.appendChild(listItem);
            
            listItem.querySelector(".delete-review").addEventListener("click", () => {
                deleteReview(productName, review.reviewText);});
        }
    }
}

function deleteReview (prodoctName, reviewText) {
    const existingReviews = JSON.parse(localStorage.getItem("reviews")) || []; 
    const updatedReviews = existingReviews.filter(
        (review) =>
            !(review.prodoctName === prodoctName && review.reviewText === reviewText)
    );
    localStorage.setItem("review", JSON.stringify(updatedReviews));
    displayReviewsForProduct(prodoctName);
}

document
    .getElementById("add-review-button")
    .addEventListener("click", addReview);
displayProducts();
