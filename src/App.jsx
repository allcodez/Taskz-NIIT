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
import { GoogleOAuthProvider } from '@react-oauth/google';
import LandingPage from './page/LandingPage/LandingPage';
import Profile from './components/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="173173126639-9e95hlhq8mdfpcltu92klvo1bcas8amp.apps.googleusercontent.com">
        <WeatherProvider>
          <TaskProvider>
            <CategoryProvider>
              <DateProvider> {/* Wrap your routes with the DateProvider */}
                <Routes>
                  <Route exact path="/" element={<LandingPage />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/star-taskz" element={<Main />} />
                  <Route path="/profile" element={<Profile />} />

                  {/* <Route path="/star-taskz" element={<ProtectedRoute element={<Main />} />} /> */}
                </Routes>
              </DateProvider>
            </CategoryProvider>
          </TaskProvider>
        </WeatherProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
