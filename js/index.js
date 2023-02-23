const cardTop = document.querySelector('#cardTop').content
const contenido = document.querySelector('#contenido')
const fragment = document.createDocumentFragment()
let topTwoHundred = []


document.addEventListener('DOMContentLoaded', () => {
    loadTopTwoHundred()
})

const loadTopTwoHundred = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9d76881b8fmshcc82d40f94d66bbp15d1ddjsn4f6ca9098d39',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
    };
    
    fetch('https://spotify81.p.rapidapi.com/top_200_tracks', options)
        .then(response => response.json())
        .then(response => {
            topTwoHundred = response
            creacards()
            console.log('canciones', topTwoHundred)
        })
        
        .catch(err => console.error(err));
}

const creacards = () => {
    topTwoHundred.forEach((song) => {
        cardTop.querySelector('img').setAttribute("src", song.trackMetadata.displayImageUri)
        cardTop.querySelector('.songname').textContent = song.trackMetadata.trackName

        const clone = cardTop.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenido.appendChild(fragment)
}