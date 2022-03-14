
export class Message{
    splice(messageId: any, arg1: number) {
      throw new Error('Method not implemented.');
    }
    post: string;
    author: string;

    constructor(obj?: any){
        this.post = obj ? obj.post: '';
        this.author = obj ? obj.author: '';

    }

    //In JSON umwandeln
    public toJSON(){
        return{
            post: this.post,
            author: this.author
        }
    }
}