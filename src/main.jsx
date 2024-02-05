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
import SignIn from './components/Roots/SignIn/index.jsx';
import SignUp from './components/Roots/SignUp/index.jsx';



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
      { path: "/signIn", element: <SignIn /> },
      { path: "/signUp", element: <SignUp />},
      { path: "/reset-password", element: <h1>React page</h1> },
      { path: "/profile/:id", element: <h1>React page</h1> },
      { path: "/favorites/:id", element: <h1>React page</h1> },
      { path: "/historic/:id", element: <h1>React page</h1> },
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
