import './styles/App.scss';
import './styles/reset.scss'
import Header from './components/Layout/Partials/Header';
import Aside from './components/Layout/Partials/Aside';
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
    <div className="app">
        <Aside />

      <div className="app__wrapper"> 
          <section className="app-wrapper__content">
            <Header />
            <Outlet />
            <Footer />
          </section>
      </div>
    </div>
  )
}

export default App
