import "styles/index.scss"

class Doggo {
    constructor() {
        this.test = 'it work';
        this.img = document.querySelector('.main__image');
        this.listField = document.querySelector('.breed-list__list')
        this.init();
    }
    getDoggoList() {
        return fetch('https://dog.ceo/api/breeds/list/all')
            .then(data => data.json())
            .then(json => json.message);
    };
    getRandomDoggoImage() {
        return fetch('https://dog.ceo/api/breeds/image/random')
            .then(data => data.json())
            .then(json => json.message);
    };
    getDoggoByBreed(breedName) {
        return fetch(`https://dog.ceo/api/breed/${breedName}/images/random`)
            .then(data => data.json())
            .then(json => {
                return json.message
            });
    }
    createDogBreedElement(breedName) {
        let box = document.createElement('div')
        let name = document.createElement('p')
        name.textContent = breedName
        box.classList.add('breed-list__box')
        name.classList.add('breed-list__name')
        box.addEventListener('click', () => {
            this.getDoggoByBreed(breedName).then(url => {
                this.img.src = url;
            });
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        })
        box.appendChild(name)
        this.listField.appendChild(box)

    }
    init() {
        window.addEventListener('DOMContentLoaded', () => {
            this.getRandomDoggoImage().then(url => {
                this.img.src = url;
            });
            this.getDoggoList().then(callback => {
                for (let element in callback) {
                    this.createDogBreedElement(element)
                }
            })
        });
    };
};


const test = new Doggo()