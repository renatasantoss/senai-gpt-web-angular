import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {

  loginForm: FormGroup;

  emailErrorMessage: string; 
  passwordErrorMessage: string;
  approvedMessage: string;

  constructor(private fb: FormBuilder) {
    // Quando a tela iniciar.

    //Inicia o formulário;
    //Cria campo obrigatório de e-mail;
    //Cria campo obrigatório de senha.
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    // Inicia com uma string vazia
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.approvedMessage = "";

  }

  async onLoginClick() {

    console.log("Email", this.loginForm.value.email);
    console.log("Password", this.loginForm.value.password);

    if (this.loginForm.value.email == ""){

      // alert("Preencha o e-mail.")
      this.emailErrorMessage = "O campo e-mail é obrigatório.";
    }

    if (this.loginForm.value.password == ""){

      // alert("Preencha a senha.")
      this.passwordErrorMessage = "O campo senha é obrigatório.";
      return;

    }

    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {
      method: "POST", // Enviar,
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })
    });

    console.log("STATUS CODE", response.status);
   
    if (response.status >= 200 && response.status <=299) {
      //alert("Requisição bem-sucedida");
      this.approvedMessage = "Login concluido com sucesso!"
    } else {
      //alert("Credencial incorreta");
    } 

  }

}
