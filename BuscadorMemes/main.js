const MEME_PLACE = 'meme-place';
const URL = 'https://api.imgflip.com/get_memes'

function filterLocalStorage(input, memesArrayObjects){
    let filteredArray = [];
    Object.keys(localStorage).forEach((key) => {
        if (localStorage.getItem(key).toLowerCase().includes(input)){
            filteredArray = memesArrayObjects.filter(obj => { return obj.name.toLowerCase().includes(input)})
        }
    });
    console.log(filteredArray)
    return filteredArray
}

function showMemesArray(memesString){
    const html = memesString
    document.getElementById(MEME_PLACE).innerHTML = html
}

async function downloadMemes(){
    let memesData = null;
    try{
        const response = await fetch(URL)
        memesData = await response.json()
        memesData.data.memes.forEach((element) => {
            window.localStorage.setItem(element.id, element.name);
        });
        return memesData.data.memes;
    } catch(error){
        console.log(`Algo ha fallado ${error.message}`)
    }
} 

function main(memesJson){
    let memesArrayObjects = []
    memesJson.forEach((meme) => {
        memesArrayObjects.push(new Meme(meme.id, meme.name, meme.url))
    })
    document.getElementById('search').addEventListener('input', function(keyText){
        let memesToBeDisplayedArray = [];
        let namesToBeDisplayed = [];
        let stringToBeDisplayed = ''

        if(keyText.target.value){
            memesToBeDisplayedArray = filterLocalStorage(keyText.target.value.toLowerCase(), memesArrayObjects);
            memesToBeDisplayedArray.forEach((element) => { stringToBeDisplayed += element.stringMeme() } )
        }
        showMemesArray(stringToBeDisplayed);
    })

}

async function loadAll(){
    let data = await downloadMemes();
    main(data);
}

loadAll();
