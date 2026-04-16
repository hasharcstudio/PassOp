import './App.css';
import { Navbar, Footer } from './components/layout';
import Manager from './components/Manager';
import { Toaster } from 'sonner';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { About, Contact } from './pages';

/**
 * Main App component
 */
function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50">
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          richColors
          expand
          closeButton
          toastOptions={{
            style: {
              background: '#fff',
              border: '1px solid #16a34a',
              borderRadius: '12px',
            },
            className: 'sonner-toast',
            duration: 3000,
          }}
        />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Manager />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;