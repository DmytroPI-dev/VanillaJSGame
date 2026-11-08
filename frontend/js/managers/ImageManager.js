export class ImageManager {
    constructor() {
        this.images = {};
    }
    load(name, path) {
        const img = new Image();
        img.src = path;
        this.images[name] = {img, loaded: false};
        img.onload = () => {
            this.images[name].loaded = true;
            console.log(`Image loaded: ${name}`);
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${name}(will use placeholder)`);
        };
    }
    get(name) { 
        return this.images[name]?.loaded ? this.images[name].img : null;

    }

    loadAll() {
        this.load("player", "./js/images/player.png"); 
    }
}