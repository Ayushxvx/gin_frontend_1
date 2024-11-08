import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import Detailed from './Detailed.jsx';
import {Routes,Route} from 'react-router-dom';
import AddPost from './Addpost.jsx';

function App(){
  return(
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="detail/:id" element={<Detailed />} />
        <Route path="addpost" element={<AddPost/>} />
      </Routes>
    </div>
  )
}

export default App;