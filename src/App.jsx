
import './App.css';
import Authenticate from './components/authenticate';
import {Routes, Route} from 'react-router-dom';
import RepositoryList from './components/repositoryList';
import Dependencies from './components/dependencies';
function App() {


  


  return (
    <div className="App">
      <Routes>
        <Route path = "/" element = {<Authenticate />} />
        <Route path = "/repository" element = {<RepositoryList />} />
        <Route path = "/dependencies" element = {<Dependencies />} />
      </Routes>
        
      


      
    </div>
  );
}

export default App;
