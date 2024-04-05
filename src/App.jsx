import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './page/Form/Form';
import Main from './page/Main/Main';
import Slider from './components/slider/Slider';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Form />} />
        <Route path='/star-taskz' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
