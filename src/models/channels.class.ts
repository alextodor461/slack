
export class Channel{
    splice(channelId: any, arg1: number) {
      throw new Error('Method not implemented.');
    }
    channelName: string;

    constructor(obj?: any){
        this.channelName = obj ? obj.channelName: '';
    }

    //In JSON umwandeln
    public toJSON(){
        return{
            channelName: this.channelName,
        }
    }
}