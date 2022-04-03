
export class Message{
    public name: any;
    public text: any = [];

   

    //In JSON umwandeln
    public toJSON(){
        return{
            name: this.name,
            text: this.text
 
        };
    }
}