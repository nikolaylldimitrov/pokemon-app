import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import {App} from './pokemon-card';
import { PokemonDetailPage } from './components/PokemonDetailPage';
import {
   createBrowserRouter,
   RouterProvider,
 } from "react-router-dom";
import GuessThePokemon from './components/GuessThePokemon';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
   {
     path: "/",
     element: <App />,
   },
   {
      path: "/pokemon/:id",
      element: < PokemonDetailPage />,
    },
    {
      path: "/guess-the-pokemon",
      element: < GuessThePokemon />,
    },
 ]);
root.render(
 // <React.StrictMode>
 <RouterProvider router={router} />  
 
 // </React.StrictMode>
);


