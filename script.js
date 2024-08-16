document.addEventListener("DOMContentLoaded", () => {
  const reviews = [
    {
      id: 1,
      reviewer: "John Doe",
      rating: 5,
      buyDate: "2024-01-15",
      reviewDate: "2024-03-15",
      useCategory: "heavy",
      review: "Excellent for heavy use! Very durable.",
      qualityRelated: true,
      damage: false,
      lateDelivery: false,
      reviewerStats: { 1: 0, 2: 1, 3: 3, 4: 4, 5: 10 }
    },
    {
      id: 2,
      reviewer: "Jane Smith",
      rating: 2,
      buyDate: "2023-06-15",
      reviewDate: "2023-07-20",
      useCategory: "light",
      review: "Not great for light use. Broke quickly.",
      qualityRelated: true,
      damage: true,
      lateDelivery: false,
      reviewerStats: { 1: 5, 2: 4, 3: 3, 4: 2, 5: 1 }
    },
    {
      id: 3,
      reviewer: "Alice Lee",
      rating: 4,
      buyDate: "2023-10-01",
      reviewDate: "2023-12-10",
      useCategory: "normal",
      review: "Good for normal use, but shipping was delayed.",
      qualityRelated: false,
      damage: false,
      lateDelivery: true,
      reviewerStats: { 1: 1, 2: 0, 3: 2, 4: 8, 5: 6 }
    },
    {
      id: 4,
      reviewer: "Tom Brown",
      rating: 3,
      buyDate: "2023-12-20",
      reviewDate: "2024-01-05",
      useCategory: "normal",
      review: "Average performance, but okay for the price.",
      qualityRelated: true,
      damage: false,
      lateDelivery: false,
      reviewerStats: { 1: 2, 2: 1, 3: 5, 4: 4, 5: 3 }
    },
    {
      id: 5,
      reviewer: "Emily Davis",
      rating: 1,
      buyDate: "2023-05-10",
      reviewDate: "2024-02-25",
      useCategory: "heavy",
      review: "Defective on arrival. Very disappointed.",
      qualityRelated: false,
      damage: true,
      lateDelivery: false,
      reviewerStats: { 1: 6, 2: 2, 3: 1, 4: 0, 5: 0 }
    },
    {
      id: 6,
      reviewer: "Michael Johnson",
      rating: 4,
      buyDate: "2023-02-01",
      reviewDate: "2024-04-10",
      useCategory: "light",
      review: "Good value for light use. Works well.",
      qualityRelated: true,
      damage: false,
      lateDelivery: false,
      reviewerStats: { 1: 0, 2: 1, 3: 3, 4: 7, 5: 4 }
    }
  ];

  const reviewList = document.getElementById("review-list");
  const filterQuality = document.getElementById("filter-quality");
  const filterDamage = document.getElementById("filter-damage");
  const filterLate = document.getElementById("filter-late");
  const filterTime = document.getElementById("filter-time");
  const filterUse = document.getElementById("filter-use");

  function renderReviews() {
    reviewList.innerHTML = "";
    const filteredReviews = reviews.filter((review) => {
      // Filter by quality-related reviews
      if (filterQuality.checked && !review.qualityRelated) return false;

      // Exclude reviews mentioning damage
      if (filterDamage.checked && review.damage) return false;

      // Exclude reviews mentioning late delivery
      if (filterLate.checked && review.lateDelivery) return false;

      // Filter by time interval between buyDate and reviewDate
      const timeFilterValue = filterTime.value;
      const buyDate = new Date(review.buyDate);
      const reviewDate = new Date(review.reviewDate);
      const timeDiff = (reviewDate - buyDate) / (1000 * 60 * 60 * 24 * 30); // Convert to months

      if (timeFilterValue === "1-month" && timeDiff < 1) return false;
      if (timeFilterValue === "6-months" && timeDiff < 6) return false;
      if (timeFilterValue === "1-year" && timeDiff < 12) return false;

      // Filter by use category
      if (filterUse.value !== "all" && filterUse.value !== review.useCategory) return false;

      return true;
    });

    filteredReviews.forEach((review) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.classList.add("review");

      reviewDiv.innerHTML = `
                <h3>${review.reviewer}</h3>
                <p class="rating">Rating: ${"★".repeat(review.rating)}</p>
                <p class="buy-date">Buy Date: ${review.buyDate}</p>
                <p class="review-date">Review Date: ${review.reviewDate}</p>
                <p>${review.review}</p>
                <p class="use-category">Use category: ${review.useCategory}</p>
                <div class="reviewer-stats hidden" id="stats-${review.id}">
                    <p>1-star: ${review.reviewerStats[1]} | 2-star: ${review.reviewerStats[2]} |
                    3-star: ${review.reviewerStats[3]} | 4-star: ${review.reviewerStats[4]} |
                    5-star: ${review.reviewerStats[5]}</p>
                </div>
                <button onclick="toggleStats(${review.id})">Show Reviewer's Rating History</button>
            `;
      reviewList.appendChild(reviewDiv);
    });
  }

  filterQuality.addEventListener("change", renderReviews);
  filterDamage.addEventListener("change", renderReviews);
  filterLate.addEventListener("change", renderReviews);
  filterTime.addEventListener("change", renderReviews);
  filterUse.addEventListener("change", renderReviews);

  renderReviews();
});

function toggleStats(id) {
  const statsDiv = document.getElementById(`stats-${id}`);
  if (statsDiv.classList.contains("hidden")) {
    statsDiv.classList.remove("hidden");
  } else {
    statsDiv.classList.add("hidden");
  }
}
