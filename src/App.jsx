import './styles/App.css';
import './styles/reset.css'
import Header from './components/Layout/Partials/Header';
import Footer from './components/Layout/Partials/Footer';
import { Outlet } from 'react-router-dom';
import store from './store';
import { useSelector } from 'react-redux';
import Aside from './components/Layout/Partials/Aside';



function App() {
  
  const {isAside} = useSelector((state) => state.isAside)

  if (localStorage.getItem("user")) {		
    store.dispatch({type:"IS_CONNECTED"})	
  }
  
  if (localStorage.getItem("user")) {		
    store.dispatch({type:"USER", payload:(JSON.parse(localStorage.getItem("user"))).name})	
  }

  return (
    <div id="app">

      <Header/>
      {isAside &&
        <Aside />
      }
            <Outlet />
            <Footer/>
    </div>
  )
}

export default App;

{/* <section className="app-wrapper__content outlet"> */}

{/* </section> */}
