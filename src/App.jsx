import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './page/Form/SignUp';
import Main from './page/Main/Main';
import Slider from './components/slider/Slider';
import './theme.css';
import { DateProvider } from '../hooks/DateContext'; // Import the DateProvider
import { WeatherProvider } from '../hooks/WeatherProvider';
import Login from './page/Form/LogIn';
import { CategoryProvider } from '../hooks/CategoryContext';
import ProtectedRoute from '../hooks/ProtectedRoute';
import { TaskProvider } from '../hooks/TaskContext';

function App() {
  return (
    <BrowserRouter>
      <WeatherProvider>
        <TaskProvider>
          <CategoryProvider>
            <DateProvider> {/* Wrap your routes with the DateProvider */}
              <Routes>
                <Route exact path="/" element={<SignUp />} />
                <Route exact path="/login" element={<Login />} />
                <Route path="/star-taskz" element={<ProtectedRoute element={<Main />} />} />
              </Routes>
            </DateProvider>
          </CategoryProvider>
          </TaskProvider>
      </WeatherProvider>
    </BrowserRouter>
  );
}

export default App;
