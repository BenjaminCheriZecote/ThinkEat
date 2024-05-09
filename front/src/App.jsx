import './styles/App.css';
import './styles/reset.css'
import Header from './components/Layout/Partials/Header';
import Footer from './components/Layout/Partials/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Aside from './components/Layout/Partials/Aside';
import actions from './store/reducers/actions';



function App() {
  
  const {isAside} = useSelector((state) => state.isAside);
  const location = useLocation();
  const {mode} = useSelector((state) => state.darkMode);

  const {initColor} = actions;
  initColor(mode);

  return (
    <>
        <Header/>
        {location.pathname !== '/' && isAside &&
          <Aside />
        }
        <Outlet />

        <Footer/>
    </>
  )
}

export default App;

