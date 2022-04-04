export class User {
  public uid: BigInteger | undefined;
  public email: string | undefined;
  public displayName: string | any;
  public photoURL: string | undefined;
  public emailVerified: boolean | undefined;
  public online: boolean | undefined;
  public status: string | undefined;
  public privateChat: any = [];
  
  constructor(){}

  //In JSON umwandeln
  public toJson() {
    return {
      uid: this.uid,
      email: this.email,
      displayName: this.displayName,
      photoURL: this.photoURL,
      emailVerified: this.emailVerified,
      online: this.online,
      status: this.status,
      privateChat: this.privateChat,
    };
  }

}
