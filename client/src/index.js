import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { JoinRoom } from './routes/PlayerPage/JoinRoom';
import { CreateRoom } from './routes/AdminPage/CreateRoom';
import { ModerRoom } from './routes/ModerPage/ModerRoom';
import { Quiz } from './routes/Quiz/Quiz';
import { ModeratorTables } from './routes/Results/ModeratorTables';
import { AppLayout } from './components/Layouts/AppLayout';

const container = document.getElementById('root');
const root = createRoot(container);

const AuthGuard = ({ children } ) =>  {
  const location = useLocation();
  const user = useSelector(state => state.lobby.clientType);

  if (!user) {
      return <Navigate to="/" state={{ from: location }} />;
  }
  
  return children;
}

const socketURL =
	process.env.NODE_ENV === "production"
		? "https://tigraranaar-chgk.herokuapp.com"
		: "http://localhost:4000";
    
export const socket = io(socketURL, {
	transports: ["websocket","polling"],
});

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<App />} />
            <Route path="create-room" element={<CreateRoom />} />
            <Route path="join-room" element={<JoinRoom />} />
            <Route path="moder-room" element={<ModerRoom />} />
            <Route path="quiz" element={<AuthGuard><Quiz /></AuthGuard>} />
            <Route path="moderator_tables" element={<AuthGuard><ModeratorTables /></AuthGuard>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
