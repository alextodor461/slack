import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  public navbar: MatSidenav | any;
  public loadNavbar: boolean = false;

  public setNavbar(navbar: MatSidenav) {
    this.navbar = navbar;
    this.loadNavbar = true;
  }

  public toggle(): void {
    return this.navbar.toggle();
  }
   public open() {
    return this.navbar.open();
  }

  //public close() {
  //  return this.navbar.close();
  //}

  
}

  
