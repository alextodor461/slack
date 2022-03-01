
export class Channel{
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