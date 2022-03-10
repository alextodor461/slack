
export class Message{
    splice(messageId: any, arg1: number) {
      throw new Error('Method not implemented.');
    }
    post: string;

    constructor(obj?: any){
        this.post = obj ? obj.post: '';
    }

    //In JSON umwandeln
    public toJSON(){
        return{
            post: this.post,
        }
    }
}