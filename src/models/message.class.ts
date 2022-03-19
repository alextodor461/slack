
export class Message{
    splice(messageId: any, arg1: number) {
      throw new Error('Method not implemented.');
    }
    post: string;
    author: string;
    sentAt: any;

    constructor(obj?: any){
        this.post = obj ? obj.post: '';
        this.author = obj ? obj.author: '';
        this.sentAt = obj ? obj.sentAt: '';
    }

    //In JSON umwandeln
    public toJSON(){
        return{
            post: this.post,
            author: this.author,
            sentAt: this.sentAt,
        }
    }
}