export class Message {
    public name: any;
    public text: any = [];
  

    constructor(obj?: any) {
      this.name = obj ? obj.name : ''; 
      this.text = obj ? obj.text : '';
    

  }
  
    /**
     * This function return the class to json.
     * 
     * @returns {json} 
     */
    public toJson() {
      return {
        name: this.name,
        text: this.text,
      };
    }
  }
  