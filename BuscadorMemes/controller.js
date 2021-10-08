class Controller {
    constructor(){
        this.URL = 'https://api.imgflip.com/get_memes';
    }

    async loadAll(){
        let data = await this.downloadMemes();
        console.log(data);
        this.run(data);
    }

    async downloadMemes(){
        let memesData = null;
        try{
            const response = await fetch(this.URL);
            memesData = await response.json();
            memesData.data.memes.forEach((element) => {
                window.localStorage.setItem(element.id, element.name);
            });
            return memesData.data.memes;
        } catch(error){
            console.log(`Algo ha fallado ${error.message}`);
        }
    } 

    run(memesJson){
        let memesArrayObjects = [];
        memesJson.forEach((meme) => {
            memesArrayObjects.push(new Meme(meme.id, meme.name, meme.url));
        })
        document.getElementById('search').addEventListener('input', (keyText) => {
            let memesToBeDisplayedArray = [];
            let namesToBeDisplayed = [];
            let stringToBeDisplayed = '';

            if(keyText.target.value){
                memesToBeDisplayedArray = Controller.prototype.filterLocalStorage(keyText.target.value.toLowerCase(), memesArrayObjects);
                memesToBeDisplayedArray.forEach((element) => { stringToBeDisplayed += element.stringMeme() } );
            }
            Controller.prototype.showMemesArray(stringToBeDisplayed);
        })

    }

    filterLocalStorage(input, memesArrayObjects){
        let filteredArray = [];
        Object.keys(localStorage).forEach((key) => {
            if (localStorage.getItem(key).toLowerCase().includes(input)){
                filteredArray = memesArrayObjects.filter(obj => { return obj.name.toLowerCase().includes(input)})
            }
        });
        console.log(filteredArray)
        return filteredArray
    }

    showMemesArray(memesString){
        const html = memesString
        document.getElementById('meme-place').innerHTML = html
    }
}
