

export class Like{
    constructor(){
        this.likes = []
    }

    addItem(id, title, author, img){
        const item = {id, title, author, img};
        this.likes.push(item);

        this.persisData()
        return item;
    }

    deleteItem(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index,1);

        this.persisData();
    }

    isNotLiked(id){
        return this.likes.findIndex(el => el.id === id) === -1;
    }

    getItemsLength(){
        return this.likes.length;
    }


    persisData(){
        localStorage.setItem('like', JSON.stringify(this.likes))
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('like'));
        if(storage) this.likes = storage;
    }
}