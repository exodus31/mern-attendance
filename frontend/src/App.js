import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './Components/Style.css';
import Home from './Components/Home';
import Landing from './Components/Landing';
import Navbar from './Components/Navbar';
import ViewCroom from './Components/ViewCroom';
import MarkAtt from './Components/MarkAtt';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (    
      <Routes>
        <Route path='' element={<Landing />} />
        <Route path='/home' element={<><Navbar /><Home /></>} />        
        <Route path='/view/:id' element={<><Navbar /><ViewCroom /></>} />
        <Route path='/markatt/:id' element={<><Navbar /><MarkAtt /></>} />
      </Routes>    
  );
}

export default App;

