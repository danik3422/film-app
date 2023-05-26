const global = {
	currentPage: window.location.pathname,
	search: {
		term: '',
		type: '',
		page: 1,
		totalPages: 1,
		totalResults: 0,
	},
	api: {
		apiKey: 'f9180433d32c1fc5f1de3dc1762d7564',
		apiUrl: 'https://api.themoviedb.org/3/',
	},
}
async function displayPopularMovies() {
	const { results } = await fetchAPIData('movie/popular')
	results.forEach((movie) => {
		const div = document.createElement('div')
		div.classList.add('card')
		div.innerHTML = `
		<a href="movie-details.html?id=${movie.id}">
		${
			movie.poster_path
				? `
			<img
				src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
				class="card-img-top"
				alt='${movie.title}'
			/>
		</a>`
				: `
		<img
			src="images/no-image.jpg"
			class="card-img-top"
			alt='${movie.title}'
		/>
	</a>`
		}
	<div class="card-body">
		<h5 class="card-title">${movie.title}</h5>
		<p class="card-text">
			<small class="text-muted">Release:${movie.release_date}</small>
		</p>
	</div>`

		document.querySelector('#popular-movies').appendChild(div)
	})
}
//Display 20 more popular tv shows
async function displayPopularShows() {
	const { results } = await fetchAPIData('tv/popular')
	results.forEach((show) => {
		const div = document.createElement('div')
		div.classList.add('card')
		div.innerHTML = `
		<a href="tv-details.html?id=${show.id}">
		${
			show.poster_path
				? `
			<img
				src="https://image.tmdb.org/t/p/w500${show.poster_path}"
				class="card-img-top"
				alt='${show.name}'
			/>
		</a>`
				: `
		<img
			src="images/no-image.jpg"
			class="card-img-top"
			alt='${show.name}'
		/>
	</a>`
		}
	<div class="card-body">
		<h5 class="card-title">${show.name}</h5>
		<p class="card-text">
			<small class="text-muted">Air Date:${show.first_air_date}</small>
		</p>
	</div>`

		document.querySelector('#popular-shows').appendChild(div)
	})
}
//Display Movie Details
async function displayMovieDetails() {
	const movieId = window.location.search.split('=')[1]

	const movie = await fetchAPIData(`movie/${movieId}`)

	//Overlay for background image
	dispayBackgroundImage('movie', movie.backdrop_path)

	const div = document.createElement('div')

	div.innerHTML = `
	<div class="details-top">
	<div>

	${
		movie.poster_path
			? `<img
			src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
			class="card-img-top"
			alt='${movie.title}'
		/>
		</a>`
			: `<img
			src="images/no-image.jpg"
			class="card-img-top"
			alt='${show.title}'
		/>
		</a>`
	}
	
	</div>
	<div>
		<h2>${movie.title}</h2>
		<p>
			<i class="fas fa-star text-primary"></i>
		${movie.vote_average.toFixed(1)}
		</p>
		<p class="text-muted">Release Date: ${movie.release_date}</p>
		<p>
			${movie.overview}
		</p>
		<h5>Genres</h5>
		<ul class="list-group">
		${movie.genres.map((item) => `<li>${item.name}</li>`).join('')}
		</ul>
		<a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
	</div>
</div>
<div class="details-bottom">
	<h2>Movie Info</h2>
	<ul>
		<li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
			movie.budget
		)}</li>
		<li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
			movie.revenue
		)}</li>
		<li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
		<li><span class="text-secondary">Status:</span> ${movie.status}</li>
	</ul>
	<h4>Production Companies</h4>
	<div class="list-group">
	${movie.production_companies
		.map((company) => `<span>${company.name}</span>`)
		.join(' , ')}</div>
</div>`

	document.querySelector('#movie-details').appendChild(div)
}

//Display Tv Details
async function displayTvDetails() {
	const tvId = window.location.search.split('=')[1]

	const tv = await fetchAPIData(`tv/${tvId}`)
	//Overlay for background image
	dispayBackgroundImage('tv', tv.backdrop_path)
	const div = document.createElement('div')

	div.innerHTML = `
	<div class="details-top">
	<div>

	${
		tv.poster_path
			? `<img
			src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
			class="card-img-top"
			alt='${tv.name}'
		/>
		</a>`
			: `<img
			src="images/no-image.jpg"
			class="card-img-top"
			alt='${tv.name}'
		/>
		</a>`
	}
	
	</div>
	<div>
		<h2>${tv.name}</h2>
		<p>
			<i class="fas fa-star text-primary"></i>
		${tv.vote_average.toFixed(1)}
		</p>
		<p class="text-muted">Last Air Date: ${tv.last_air_date}</p>
		<p>
			${tv.overview}
		</p>
		<h5>Genres</h5>
		<ul class="list-group">
		${tv.genres.map((item) => `<li>${item.name}</li>`).join('')}
		</ul>
		<a href="${tv.homepage}" target="_blank" class="btn">Visit tv Homepage</a>
	</div>
</div>
<div class="details-bottom">
	<h2>Show Info</h2>
	<ul>
		<li><span class="text-secondary">Number of Episodes:</span> ${
			tv.number_of_episodes
		}</li>
		<li><span class="text-secondary">Last Episode to Air :</span> ${
			tv.last_episode_to_air.air_date
		}</li>
		
		<li><span class="text-secondary">Status:</span> ${tv.status}</li>
	</ul>
	<h4>Production Companies</h4>
	<div class="list-group">
	${tv.production_companies
		.map((company) => `<span>${company.name}</span>`)
		.join(' , ')}</div>
</div>`

	document.querySelector('#show-details').appendChild(div)
}

//Display backdrop on detatils
function dispayBackgroundImage(type, path) {
	const overlay = document.createElement('div')
	overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`
	overlay.style.backgroundSize = 'cover'
	overlay.style.backgroundPosition = 'center'
	overlay.style.backgroundRepeat = 'no-repeat'
	overlay.style.height = '100vh'
	overlay.style.width = '100vw'
	overlay.style.position = 'absolute'
	overlay.style.top = '0'
	overlay.style.left = '0'
	overlay.style.zIndex = '-1'
	overlay.style.opacity = '0.1'

	if (type === 'movie') {
		document.querySelector('#movie-details').appendChild(overlay)
	} else {
		document.querySelector('#show-details').appendChild(overlay)
	}
}

//Search Movies/Shows
async function search() {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	global.search.type = urlParams.get('type')
	global.search.term = urlParams.get('search-term')

	if (global.search.term !== '' && global.search.term !== null) {
		const { results, total_pages, page, total_results } = await searchAPIData()

		global.search.page = page
		global.search.totalPages = total_pages
		global.search.totalResults = total_results
		if (results.length === 0) {
			showAlert('No results found')
			return
		}

		displaySearchResults(results)

		document.querySelector('#search-term').value = ''
	} else {
		showAlert('Please enter a search term')
	}

	displayPagination()
}

//Create and display pagination for search
function displayPagination() {
	const div = document.createElement('div')
	div.className = 'pagination'
	div.innerHTML = `<button class="btn btn-primary" id="prev">Prev</button>
 <button class="btn btn-primary" id="next">Next</button>
 <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`

	document.querySelector('#pagination').appendChild(div)
	//Disable prev button if on first page
	if (global.search.page === 1) {
		document.querySelector('#prev').disabled = true
	}

	//Disable next button if on last page
	if (global.search.page === global.totalPages) {
		document.querySelector('#next').disabled = true
	}

	//Next page
	document.querySelector('#next').addEventListener('click', async () => {
		global.search.page += 1
		console.log(global.search)

		const { results, totalPages } = await searchAPIData()
		displaySearchResults(results)
	})
}

//Display search results
function displaySearchResults(results) {
	//Clear previous results
	document.querySelector('#search-results').innerHTML = ''
	document.querySelector('#search-results-heading').innerHTML = ''
	results.forEach((result) => {
		const div = document.createElement('div')
		div.classList.add('card')
		div.innerHTML = `
		<a href="${global.search.type}-details.html?id=${result.id}">
		${
			result.poster_path
				? `
			<img
				src="https://image.tmdb.org/t/p/w500${result.poster_path}"
				class="card-img-top"
				alt='${global.search.type === 'movie' ? result.title : result.name}'
			/>
		</a>`
				: `
		<img
			src="images/no-image.jpg"
			class="card-img-top"
			alt='${global.search.type === 'movie' ? result.title : result.name}'
		/>
	</a>`
		}
	<div class="card-body">
		<h5 class="card-title">${
			global.search.type === 'movie' ? result.title : result.name
		}</h5>
		<p class="card-text">
			<small class="text-muted">Release:${
				global.search.type === 'movie'
					? result.release_date
					: result.first_air_date
			}</small>
		</p>
	</div>`

		document.querySelector(
			'#search-results-heading'
		).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`
		document.querySelector('#search-results').appendChild(div)
	})
}
//Display slider movies
async function displaySlider() {
	const { results } = await fetchAPIData('movie/now_playing')
	results.forEach((movie) => {
		const div = document.createElement('div')
		div.classList.add('swiper-slide')
		div.innerHTML = `
		<a href="movie-details.html?id=${movie.id}">
			<img src="http://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
			movie.title
		}" />
		</a>
		<h4 class="swiper-rating">
			<i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
		</h4>

	`

		document.querySelector('.swiper-wrapper').appendChild(div)

		initSwiper()
	})
}

function initSwiper() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		freeMode: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		breakpoints: {
			500: {
				slidesPerView: 2,
			},
			700: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	})
}
//Fetch from api
async function fetchAPIData(endpoint) {
	const API_KEY = global.api.apiKey
	const API_URL = global.api.apiUrl
	showSpinner()
	const responce = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	)

	const data = await responce.json()
	hideSpinner()
	return data
}
//Make Request To Search
async function searchAPIData() {
	const API_KEY = global.api.apiKey
	const API_URL = global.api.apiUrl
	showSpinner()
	const responce = await fetch(
		`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
	)

	const data = await responce.json()
	hideSpinner()
	return data
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show')
}

function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show')
}

//Highlight active link
function highlightActiveLink() {
	const links = document.querySelectorAll('.nav-link')
	links.forEach((item) => {
		if (item.getAttribute('href') === global.currentPage) {
			item.classList.add('active')
		}
	})
}
function showAlert(message, className = 'error') {
	const alertEl = document.createElement('div')
	alertEl.classList.add('alert', className)
	alertEl.appendChild(document.createTextNode(message))
	document.querySelector('#alert').appendChild(alertEl)

	setTimeout(() => {
		alertEl.remove()
	}, 2000)
}

function addCommasToNumber(number) {
	return number.toString().replace(/(\d{3})(?!$)/g, '$1,')
}

//Init App
function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displaySlider()
			displayPopularMovies()
			break

		case '/shows.html':
			displayPopularShows()
			break

		case '/movie-details.html':
			displayMovieDetails()
			break
		case '/tv-details.html':
			displayTvDetails()
			break
		case '/search.html':
			search()
			break
	}
	highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)
