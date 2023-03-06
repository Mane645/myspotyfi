const cardTop = document.querySelector('#cardTop').content
const contenido = document.querySelector('#contenido')
const fragment = document.createDocumentFragment()
const btnBuscar = document.getElementById('buscador')
const allBtn = document.querySelector('.mostrarTodo')
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
        let artists = ''
        let size = song.trackMetadata.artists.length
        song.trackMetadata.artists.forEach((item, index) => {
            if(index === size-1){
                artists += item.name 
            } else {
                artists += item.name + ' / '
            }
        })
        cardTop.querySelector('.artistname').textContent = artists

        const clone = cardTop.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenido.appendChild(fragment)
}

btnBuscar.addEventListener('keypress', () => {
    document.getElementById("contenido").innerHTML = ''
    topTwoHundred.forEach((song) => {
        const index = song.trackMetadata.trackName.indexOf(btnBuscar.value)
        if(index >= 0) {
            cardTop.querySelector('img').setAttribute("src", song.trackMetadata.displayImageUri)
            cardTop.querySelector('.songname').textContent = song.trackMetadata.trackName
            let artists = ''
            let size = song.trackMetadata.artists.length
            song.trackMetadata.artists.forEach((item, index) => {
                if(index === size-1){
                    artists += item.name 
                } else {
                    artists += item.name + ' / '
                }
            })
            cardTop.querySelector('.artistname').textContent = artists

            const clone = cardTop.cloneNode(true)
            fragment.appendChild(clone)
        }
    })
    contenido.appendChild(fragment)
})

allBtn.addEventListener('click', () => {
    document.getElementById("contenido").innerHTML = ''
    creacards()
})