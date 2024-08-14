// ---------------------Menu Mobile----------------------
const btnMenu= document.getElementById("button--menu")
const menu= document.getElementById("menu")
const resultMovies=document.getElementById("result--movies")
const btnClose= document.getElementById("btn--close")
const btnSearch=document.getElementById("btn--search")
const searchValue= document.getElementById("search--value")

btnMenu.addEventListener("click", ()=>{
    menu.classList.add("show--menu")
} )

btnClose.addEventListener("click",()=>{
    menu.classList.remove("show--menu")
})

// ---------------------------Dark mode------------------------------------
const body=document.body
const btnDarkMode= document.getElementById("btn--dark")

btnDarkMode.addEventListener("click", ()=>{
    body.classList.toggle("bg--color-change")
})
// ---------------------/Trending movies display-------------------------
const apiUrl= 'https://api.themoviedb.org/3/trending/movie/week?api_key=82152f54798e7ea5895a336297f462da'
const moviesContainer = document.getElementById("movies")
let jjj=""
async function fetchMovies() {

    try{
        const response = await fetch(apiUrl)
        const data = await response.json();

        data.results.forEach(media=> {
             jjj="https://image.tmdb.org/t/p/w500/"+ media.backdrop_path
            const movieCard = createMovieCard(media);
            moviesContainer.appendChild(movieCard)
        })
    }catch(error){
    console.error(`Error getting the information:`,error)

    }
    
    
}

async function searchMovie(searchVal){


    // 

    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=82152f54798e7ea5895a336297f462da&query=${searchVal}`)
        const data = await response.json();

        data.results.forEach(media=> {  
             jjj="https://image.tmdb.org/t/p/w500/"+ media.backdrop_path
            const movieCard = createMovieCard(media);
            resultMovies.appendChild(movieCard)
        })
    }catch(error){
    console.error(`Error getting the information:`,error)

    }


}

btnSearch.addEventListener("click", async()=>{
    const movieResults= searchMovie(searchValue.value)
    

})




function createMovieCard(media){
    const {title,overview, backdrop_path}=media

    const movieCard= document.createElement("div")
    movieCard.classList.add("movie_item")

    let imgage = backdrop_path
    let dfds= "https://image.tmdb.org/t/p/w500/imgage"+imgage

    movieCard.innerHTML = `
    <img src="${jjj}" class="movie_img">
    <h1 class="movieCard--title">${title}</h1>
    <div class="movieCard--overview">${overview}</div>`
    return movieCard
    
}
fetchMovies()
