import { Logo } from '../common';

/**
 * Footer component with credits
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Logo size="sm" />
          
          <span className="hidden sm:block text-slate-500">|</span>
          
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span>Created with</span>
            <img
              src="/icons/heart.png"
              alt="love"
              className="w-5 h-5 animate-pulse"
            />
            <span>by</span>
            <a
              href="https://github.com/SajjadHossain0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 font-medium transition-colors"
            >
              Sajjad Hossain
            </a>
          </div>
        </div>
        
        <p className="text-center text-slate-500 text-sm mt-4">
          © {currentYear} PassOP. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
