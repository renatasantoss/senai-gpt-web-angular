import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { first, firstValueFrom } from 'rxjs';

interface Ichat {

  chatTitle: string;
  id: number;
  userId: string;

}

interface IMessage {

  chatId: number;
  id: number;
  text: string;
  userId: string;

}

@Component({
  selector: 'app-tela-chat',
  imports: [NgForOf, CommonModule],
  templateUrl: './tela-chat.html',
  styleUrl: './tela-chat.css'
})
export class TelaChat {

  chats: Ichat[];
  chatSelecionado: Ichat;
  mensagens: IMessage[];

  constructor (private http: HttpClient, private cd: ChangeDetectorRef) {

    this.chats = [];
    this.chatSelecionado = null!;
    this.mensagens = [];

  } 

  ngOnInit() {

    this.getChats();

  }

  async getChats () {

    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/chats", {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      } 
    }));

    console.log("Chats", response);

    if (response) {

     this.chats = response as [];

    } else {

      console.log("Erro ao buscar os chats.")

    }

    this.cd.detectChanges();

  }

  async onChatClick (chatClicado: Ichat) {

    console.log("Chat Clicado", chatClicado);

    this.chatSelecionado = chatClicado;

    //Lógica para buscar as mensagens.

      let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/messages?chatId=" + chatClicado.id, {
        headers: {
          "Authorization" : "Bearer " + localStorage.getItem("meuToken")
        } 
    }));

    console.log("MENSAGENS", response);

    this.mensagens = response as IMessage[];

  }
}
