import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from './store/index.jsx';
import { Provider } from 'react-redux';
import './styles/index.scss'

import App from './App.jsx'
import Home from './components/Layout/Home/index.jsx';
import Proposal from './components/Roots/Proposal/index.jsx';
import Favorites from './components/Roots/Favorites/index.jsx';
import Historic from './components/Roots/Historic/index.jsx';
import SignIn, { signInAction } from './components/Roots/SignIn/index.jsx';
import SignUp, { signUpAction } from './components/Roots/SignUp/index.jsx';
import ResetPassword, { resetPasswordAction } from './components/Roots/ResetPassword/index.jsx';
import Profil from './components/Roots/Profile/index.jsx';
import Recipes from './components/Roots/Recipes/index.jsx';
import Recipe from './components/Roots/Recipe/index.jsx';
import ValidateAccount, { validateAccountLoader } from './components/Roots/Validate/validateAccount.jsx';
import ValidatePassword, { validatePasswordAction } from './components/Roots/Validate/validatePassword.jsx';

//

const router = createBrowserRouter([									
	{								
		path: "/",							
		element: <App />,							
		// errorElement: <NotFound />,											
		children: [							
      { index: true, element: <Home />},
      { path: "/favorites", element: <Favorites /> },
      { path: "/proposal", element: <Proposal /> },
      { path: "/historic", element: <Historic /> },
      { path: "/signin", element: <SignIn />, action: signInAction },
      { path: "/signup", element: <SignUp />, action: signUpAction},
      { path: "/reset-password", element: <ResetPassword />, action: resetPasswordAction },
      { path: "/profile", element: <Profil /> },
      { path: "/recipes", element: <Recipes /> },
      { path: "/recipes/:id", element: <Recipe /> },
      { path: "/profile/:id", element: <h1>React page</h1> },
      { path: "/favorites/:id", element: <h1>React page</h1> },
      { path: "/historic/:id", element: <h1>React page</h1> },
      { path: "/validate/account/:uuid", element: <ValidateAccount />, loader: validateAccountLoader },
      { path: "/validate/password/:uuid", element: <ValidatePassword />, action: validatePasswordAction }
		],
	},								
  { path: "/profile", element: <h1>Profile</h1> }		
]);	


ReactDOM.createRoot(document.getElementById('root')).render(			
  <React.StrictMode>	
    <Provider store={store}>
      <RouterProvider router={router} />	
    </Provider>		
  </React.StrictMode>,			
);		
