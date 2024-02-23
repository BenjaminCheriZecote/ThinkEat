import './styles/App.scss';
import './styles/reset.scss'
import Header from './components/Layout/Partials/Header';
import Footer from './components/Layout/Partials/Footer';
import { Outlet } from 'react-router-dom';
import store from './store';




function App() {
  if (localStorage.getItem("user")) {		
    store.dispatch({type:"IS_CONNECTED"})	
  }
  
  if (localStorage.getItem("user")) {		
    store.dispatch({type:"USER", payload:(JSON.parse(localStorage.getItem("user"))).name})	
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
