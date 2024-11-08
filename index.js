// const accessKey = "iYoJqew898PouOddczxj-IHAbwKWJ6_pBShM8aqitxg";

// const formEle = document.querySelector("form");
// const inpEl = document.querySelector("#search-input"); // Fixed selector for input element
// const searchResults = document.querySelector(".search-results");
// const showMoreBtn = document.getElementById("show-more-btn"); // Fixed selector for show more button

// let inputData = "";
// let page = 1;

// async function searchImages() {
//     inputData = inpEl.value;
//     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
//     // Example API call function to search images
//     // fetchImages(inputData, page);

//     const response = await fetch(url);
//     const data = await response.json();

//     const results=data.results

//     if(page == 1){
//         searchResults.innerHTML = " ";
//     }

//     results.map((results) =>{
//         const imagewrapper = document.createElement('div');
//         imagewrapper.classList.add("search-result");

//         const image = document.createElement('img');
//         image.src = result.urls.small
//         image.alt = result.alt_description

//         const imageLink = document.createElement('a');
//         imageLink.href = result.links.html
//         imageLink.target = "_blank";
//         imageLink.textContent = result.alt_description

//         imageWrapper.appendChild(image);
//         imageWrapper.appendChild(imageLink);

//         // Append imageWrapper to searchResults container
//         searchResults.appendChild(imageWrapper);
//     })

//     page++
//     if(page > 1){
//         showMoreBtn.style.display = "block"
//     }
// }

// formEle.addEventListener("submit",(event)=>{
//     event.preventDefault();
//     page = 1;
//     searchImages();

// })


// showMoreBtn.addEventListener("click",()=>{
//     // event.preventDefault();
//     // page = 1;
//     searchImages();
// })
















const accessKey = "iYoJqew898PouOddczxj-IHAbwKWJ6_pBShM8aqitxg";

const formEle = document.querySelector("form");
const inpEl = document.querySelector("#search-input"); // Fixed selector for input element
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-btn"); // Fixed selector for show more button

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inpEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        // Clear previous results if it's the first page
        if (page === 1) {
            searchResults.innerHTML = "";
        }

        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");

            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";

            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || "View on Unsplash";

            // Append image and link to the imageWrapper
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);

            // Append imageWrapper to searchResults container
            searchResults.appendChild(imageWrapper);
        });

        // Show "Show More" button if more pages are available
        if (data.total_pages > page) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }

        // Increment the page for the next "Show More" click
        page++;

    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// Event listener for form submission
formEle.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; // Reset page number for new search
    searchImages(); // Perform search
});

// Event listener for the "Show More" button
showMoreBtn.addEventListener("click", () => {
    searchImages(); // Fetch next page of results
});
