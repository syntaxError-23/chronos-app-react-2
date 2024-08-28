import './index.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import SchedulePage from './pages/SchedulePage'
import Modal from './components/Modal';
import Landing from './components/Landing';
import Schedule from './components/Schedule';


function App() {

  return (
    <>
        <Modal />
        <Router basename="/chronos-app-react">
          <Switch> 
              <Route exact path="/" component={LandingPage} />
              <Route path="/schedule" component={SchedulePage} />            
          </Switch>
        </Router>

    </>
  )
}

export default App
