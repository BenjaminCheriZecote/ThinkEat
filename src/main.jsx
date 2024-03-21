import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from './store/index.jsx';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error404 from './components/Roots/ErrorElement/Error404/Error404.jsx'

import './styles/index.css';


import App from './App.jsx'
import Home, { homeLoader } from './components/Roots/Home/index.jsx';
import Proposal, { proposaLoader } from './components/Roots/Proposal/index.jsx';
import Favorites, { favoritesLoader } from './components/Roots/Favorites/index.jsx';
import Historic, { historicLoader } from './components/Roots/Historic/index.jsx';
import SignIn, { signInAction, signinLoader } from './components/Roots/SignIn/index.jsx';
import SignUp, { signUpAction, signupLoader } from './components/Roots/SignUp/index.jsx';
import ResetPassword, { resetPasswordAction } from './components/Roots/ResetPassword/index.jsx';
import Recipes, { recipesLoader } from './components/Roots/Recipes/index.jsx';
import Recipe, { recipeLoader } from './components/Roots/Recipe/index.jsx';
import { validateAccountLoader } from './components/Roots/Validate/validateAccount.js';
import ValidatePassword, { validatePasswordAction } from './components/Roots/Validate/validatePassword.jsx';

import Profil, { profilLoader } from './components/Roots/Profile/index.jsx';
import DietPreferences from './components/Roots/Profile/DietPreferences/index.jsx';
import Account, { accountAction } from './components/Roots/Profile/Account/index.jsx';
import ProfilUser from './components/Roots/Profile/ProfileUser/index.jsx';
import { asideLoader } from './components/Layout/Partials/Aside/index.jsx';
import { recipeAction } from './components/Layout/UXElements/components/RecipeUX/index.jsx';

import eh from './helpers/errorHandler.js'

const router = createBrowserRouter([									
	{								
		path: "",							
		element: <App />,
    // loader: eh(asideLoader)	
		// errorElement: <Error404 />,									
		children: [							
      { path:"/", element: <Home />, loader:eh(homeLoader)},
      { path: "/favorites", element: <Favorites />, action:eh(recipeAction), loader:eh(favoritesLoader) },
      { path: "/proposal", element: <Proposal />, loader:eh(proposaLoader) },
      { path: "/historic", element: <Historic />, loader:eh(historicLoader) },
      { path: "/signin", element: <SignIn />, loader:eh(signinLoader), action: eh(signInAction) },
      { path: "/signup", element: <SignUp />, loader:eh(signupLoader) ,action: eh(signUpAction)},
      { path: "/reset-password", element: <ResetPassword />, action: eh(resetPasswordAction) },
      { path: "/recipes", element: <Recipes />, action:eh(recipeAction), loader:eh(recipesLoader) },
      { path: "/recipes/:id",element: <Recipe />, loader: eh(recipeLoader), action:eh(recipeAction) },
      { path: "/validate/account/:uuid", element: <></>, loader: eh(validateAccountLoader) },
      { path: "/validate/password/:uuid", element: <ValidatePassword />, action: eh(validatePasswordAction) },
      { path: "/profil", element:<Profil />, 
      children: [
        { index:true, element: <ProfilUser/>, loader:eh(profilLoader) },
        { path: "diet-preferences", element: <DietPreferences/> },
        { path: "account", element: <Account/>, action:eh(accountAction) },
      ]}		
		],
	},								
]);	


ReactDOM.createRoot(document.getElementById('root')).render(			
  <React.StrictMode>	
    <Provider store={store}>
      <RouterProvider router={router} />	
    </Provider>
    <ToastContainer />	
  </React.StrictMode>			
);		
