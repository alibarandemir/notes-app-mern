import './App.css';
import Register from './pages/Register';
import Login from './pages/Login'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import NoteDetail from './components/NoteDetail';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <Toaster/>
      <Router>
        <Routes>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          {/* <Route path='' element={<PrivateRoute>
            <Route path='/' element={<Home />} />
          </PrivateRoute>}> */}
          <Route path='/' element={<Home/>}> </Route>
          <Route path='/profile/:userId' element={<Profile/>}></Route>
          <Route path='/:id' element={<NoteDetail/>}></Route>



        </Routes>



      </Router>

    </div>
    </DndProvider>
  );
}

export default App;






