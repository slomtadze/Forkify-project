

export class Like{
    constructor(){
        this.likes = []
    }

    addItem(id, title, author, img){
        const item = {id, title, author, img};
        this.likes.push(item);

        return item;
    }

    deleteItem(id){
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index,1)
    }

    isNotLiked(id){
        return this.likes.findIndex(el => el.id === id) === -1;
    }

    getItemsLength(){
        return this.likes.length;
    }
}