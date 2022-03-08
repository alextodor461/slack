export class User{
    splice(channelId: any, arg1: number) {
      throw new Error('Method not implemented.');
    }
    displayName: string;

    constructor(obj?: any){
        this.displayName = obj ? obj.displayName: '';
    }

    //In JSON umwandeln
    public toJSON(){
        return{
            displayName: this.displayName,
        }
    }
}