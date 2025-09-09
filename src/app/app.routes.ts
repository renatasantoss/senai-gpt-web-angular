import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { TelaChat } from './tela-chat/tela-chat';


export const routes: Routes = [

    {

        path: "login",
        loadComponent: () => LoginScreen

    },

    {

        path: "",
        loadComponent: () => LoginScreen

    },

    {

        path: "chat",
        loadComponent: () => TelaChat

    },

];

