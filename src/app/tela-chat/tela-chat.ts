import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';

interface Ichat {

  chatTitle: string;
  id: number;
  userId: string;

}

@Component({
  selector: 'app-tela-chat',
  imports: [HttpClientModule, NgForOf, CommonModule],
  templateUrl: './tela-chat.html',
  styleUrl: './tela-chat.css'
})
export class TelaChat {

  chats: Ichat[];

  constructor (private http: HttpClient) {

    this.chats = [];
    

  } 

  ngOnInit() {

    this.getChats();

  }

  async getChats () {

    let response = await this.http.get("https://senai-gpt-api.azurewebsites.net/chats", {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      } 
    }).toPromise();

    console.log("Chats", response);

    if (response) {

     this.chats = response as [];

    } else {

      console.log("Erro ao buscar os chats.")

    }
  }
}
