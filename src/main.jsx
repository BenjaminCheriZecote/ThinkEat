import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from './store/index.jsx';
import { Provider } from 'react-redux';
import './styles/index.scss';


import App from './App.jsx'
import Home from './components/Layout/Home/index.jsx';
import Proposal from './components/Roots/Proposal/index.jsx';
import Favorites from './components/Roots/Favorites/index.jsx';
import Historic from './components/Roots/Historic/index.jsx';
import SignIn, { signInAction } from './components/Roots/SignIn/index.jsx';
import SignUp, { signUpAction } from './components/Roots/SignUp/index.jsx';
import ResetPassword, { resetPasswordAction } from './components/Roots/ResetPassword/index.jsx';
import Recipes from './components/Roots/Recipes/index.jsx';
import Recipe from './components/Roots/Recipe/index.jsx';
import ValidateAccount, { validateAccountLoader } from './components/Roots/Validate/validateAccount.jsx';
import ValidatePassword, { validatePasswordAction } from './components/Roots/Validate/validatePassword.jsx';

import Profil from './components/Roots/Profile/index.jsx';
import DietPreferences from './components/Roots/Profile/DietPreferences/index.jsx';
import Account from './components/Roots/Profile/Account/index.jsx.jsx';
import ProfilUser from './components/Roots/Profile/ProfileUser/index.jsx';
import { asideLoader } from './components/Layout/Partials/Aside/index.jsx';

const router = createBrowserRouter([									
	{								
		path: "/",							
		element: <App />, loader:asideLoader,							
		// errorElement: <NotFound />,											
		children: [							
      { index: true, element: <Home />},
      { path: "/favorites", element: <Favorites /> },
      { path: "/proposal", element: <Proposal /> },
      { path: "/historic", element: <Historic /> },
      { path: "/signin", element: <SignIn />, action: signInAction },
      { path: "/signup", element: <SignUp />, action: signUpAction},
      { path: "/reset-password", element: <ResetPassword />, action: resetPasswordAction },
      { path: "/recipes", element: <Recipes /> },
      { path: "/recipes/:id", element: <Recipe /> },
      { path: "/validate/account/:uuid", element: <ValidateAccount />, loader: validateAccountLoader },
      { path: "/validate/password/:uuid", element: <ValidatePassword />, action: validatePasswordAction }
		],
	},								
  { path: "/profil", element:<Profil />,
  children: [
    { index:true, element: <ProfilUser/> },
    { path: "diet-preferences", element: <DietPreferences/> },
    { path: "account", element: <Account/> },
  ]}		
]);	


ReactDOM.createRoot(document.getElementById('root')).render(			
  <React.StrictMode>	
    <Provider store={store}>
      <RouterProvider router={router} />	
    </Provider>		
  </React.StrictMode>,			
);		
