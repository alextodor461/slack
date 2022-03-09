export class User{
    splice(channelId: any, arg1: number) {
      throw new Error('Method not implemented.');
    }
    displayName: string;
    messageText: string;

    constructor(obj?: any){
        this.displayName = obj ? obj.displayName: '';
        this.messageText = obj ? obj.messageText: '';
    }

    //In JSON umwandeln
    public toJSON(){
        return{
            displayName: this.displayName,
            messageText: this.messageText
        }
    }
}
