const charList = document.getElementById('character-list')
const prev = document.getElementById('prev-page')
const next = document.getElementById('next-page')
let page = 1
let maxPage = 100

prev.addEventListener('click', ()=> {
    if(page>1){
        page--
        updateView()
    }
})

next.addEventListener('click', ()=>{
    if(page < maxPage){
        page++
        updateView()
    }
})

updateView()

function updateView() {
    charList.innerHTML = null
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then((response) => {
        if (!response.ok) {
            throw new Error('La solicitud no ha podido ser resuelta');
        } else {
            return response.json();
        }
    }).then((pj) => {
        maxPage = pj.info.pages
        pj.results.map((character) => {
            /*
            let listItem = document.createElement('li')

            let image = document.createElement('img')
            image.setAttribute('src', character.image)
            listItem.appendChild(image)

            let nombre = document.createElement('b')
            nombre.innerText = 'Name: '
            let name = document.createElement('p')
            name.appendChild(nombre)
            name.append(character.name)
            listItem.appendChild(name)

            let especie = document.createElement('b')
            especie.innerText = 'Species: '
            let species = document.createElement('p')
            species.appendChild(especie)
            species.append(character.species)
            listItem.appendChild(species)
            
            charList.appendChild(listItem)
            */
            charList.innerHTML += `
            <li>
                <img src = "${character.image}">
                <p><b>Name: </b>${character.name}</p>
                <p><b>Species: </b>${character.species}</p>
            </li>
            `
        })
    }).catch((error) => {
        console.log('Error: '+error);
    });
}
