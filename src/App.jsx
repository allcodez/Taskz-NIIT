import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './page/Form/Form';
import Main from './page/Main/Main';
import Slider from './components/slider/Slider';
import './theme.css';
import { DateProvider } from '../hooks/DateContext'; // Import the DateProvider
import { WeatherProvider } from '../hooks/WeatherProvider';

function App() {
  return (
    <BrowserRouter>
      <WeatherProvider>
        <DateProvider> {/* Wrap your routes with the DateProvider */}
          <Routes>
            <Route exact path="/" element={<Form />} />
            <Route path="/star-taskz" element={<Main />} />
          </Routes>
        </DateProvider>
      </WeatherProvider>
    </BrowserRouter>
  );
}

export default App;