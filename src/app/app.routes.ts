import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { TelaChat } from './tela-chat/tela-chat';
import { authGuard } from './auth.guard';
import { NewUserScreen } from './new-user-screen/new-user-screen';


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
        loadComponent: () => TelaChat,
        canActivate: [authGuard]

    },

    {

        path: "new user screen",
        loadComponent: () => NewUserScreen

    }
];

