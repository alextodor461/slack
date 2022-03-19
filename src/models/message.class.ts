
export class Message{
    public name: any;
    public text: any = [];

   
    //post: string;
    //author: string;
    //sentAt: any;

    //constructor(obj?: any){
    //    this.post = obj ? obj.post: '';
    //    this.author = obj ? obj.author: '';
    //    this.sentAt = obj ? obj.sentAt: '';
    //}

    //In JSON umwandeln
    public toJSON(){
        return{
            name: this.name,
            test: this.text
            //post: this.post,
            //author: this.author,
            //sentAt: this.sentAt,
        };
    }
}