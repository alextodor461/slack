export class Message {
    public name: any;
    public message: any = [];
  
  
    /**
     * This function return the class to json.
     * 
     * @returns {json} 
     */
    public toJson() {
      return {
        name: this.name,
        text: this.message,
      };
    }
  }
  