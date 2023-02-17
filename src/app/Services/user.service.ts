import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private myUser: HttpClient) {}
  baseUrl = 'https://ecommerceiti-heba.onrender.com/users';
  updateUrl = 'https://ecommerceiti-heba.onrender.com/users/update';
  imageUrl = 'https://ecommerceiti-heba.onrender.com/users/images';

  getOneUser(id: any) {
    return this.myUser.get(`${this.baseUrl}/${id}`);
  }

  //update image
  updateUserImage(id: any, imageFile: any) {
    this.isUpdated = true;
    return this.myUser.put(`${this.imageUrl}/${id}`, imageFile);
  }

  isUpdated = false;
  //update user
  token = localStorage.getItem('token');
  updateUser(id: any, newUser: any) {
    const head = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    console.log('Bearer ' + this.token);
    console.log(this.token);
    console.log(head);
    this.isUpdated = true;

    return this.myUser.put(`${this.updateUrl}/${id}`, newUser, {
      headers: head,
    });
  }

  //user orders
  orderUrl= "https://ecommerceiti-heba.onrender.com/order/user";
  // cancelUrl = "https://ecommerceiti-heba.onrender.com/order/63ebd5ba9ac56a432b293996/cancle"
  getAccept(id:any){
    return this.myUser.get(`${this.orderUrl}/${id}?status=accepted`);
  }
  getPending(id:any){
    return this.myUser.get(`${this.orderUrl}/${id}?status=pending`);
  }
  getReject(id:any){
    return this.myUser.get(`${this.orderUrl}/${id}?status=rejected`);
  }
}
