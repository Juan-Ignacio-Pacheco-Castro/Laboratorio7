class Meme {
    constructor(id, name, imageRef){
        this.id = id
        this.name = name;
        this.imageRef = imageRef;
    }

    stringMeme(){
        let content = `${this.name} <br/>`
        content += `<img src="${this.imageRef}"><br/><br/><br/><hr/>`
        return content
    }
}