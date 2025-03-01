import "./App.css";
import Navbar from "./component/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routesConfig } from "./routes/routes";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50 shadow-md">
          <Navbar />
        </header>

        {/* Main Layout*/}
        <div className="flex flex-col flex-grow pt-16 pb-16">
          <main className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-4xl h-full p-6 bg-white shadow-lg rounded-2xl flex flex-col">
              {/* Routes */}
              <div className="flex-grow">
                <Routes>
                  {routesConfig.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Routes>
              </div>
            </div>
          </main>
        </div>

        {/* Footer Component*/}
        <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-4 text-center">
          <p>&copy; 2025 Bootcamp</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
