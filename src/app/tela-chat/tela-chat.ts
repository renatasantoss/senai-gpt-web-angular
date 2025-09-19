import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { first, firstValueFrom } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
  imports: [NgForOf, CommonModule, ReactiveFormsModule],
  templateUrl: './tela-chat.html',
  styleUrl: './tela-chat.css'
})
export class TelaChat {

  chats: Ichat[];
  chatSelecionado: Ichat;
  mensagens: IMessage[];
  mensagemUsuario = new FormControl("");

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

    this.cd.detectChanges();

  }

  async enviarMensagem () {

    let novaMensagemUsuario = {

      chatId: this.chatSelecionado.id,
      UserId: localStorage.getItem("meuId"),
      text: this.mensagemUsuario.value

    };

      let novaMensagemUsuarioResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", novaMensagemUsuario, {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      } 
    }));

    await this.onChatClick(this.chatSelecionado);

    // 2 - Enviar a mensagem do usuário para a IA responder

    let respostaIAResponse =  await firstValueFrom(this.http.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
      "contents": [
        {
          "parts": [
            {
              "text": this.mensagemUsuario.value + ". Me dê uma resposta objetiva."
            }
          ]
        }
      ]
    }, {

      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": "AIzaSyDV2HECQZLpWJrqCKEbuq7TT5QPKKdLOdo"
      }
    })) as any;

    let novaRespostaIA = {

      chatId: this.chatSelecionado.id,
      userId: "chatbot",
      text: respostaIAResponse.candidates[0].content.parts[0].text

    }

      let novaRespostaIAResponse = await firstValueFrom(this.http.post("https://senai-gpt-api.azurewebsites.net/messages", novaMensagemUsuario, {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      } 
    }));

    await this.onChatClick(this.chatSelecionado);

  }
}
