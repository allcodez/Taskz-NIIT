import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './page/Form/Form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
