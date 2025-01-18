import "./Footer.css";
/**
 * Footer component of the application
 *
 * This component renders the footer of the application containing the logo, contact information, opening hours, and social media links.
 *
 * @returns {JSX.Element} The footer component
 */
export default function Footer(): JSX.Element {
  return (
    <footer className="bg-slate-800 text-white p-8  ">
      <div className="container">
        <img
          className="footer-img"
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-gym-fitness-logo-design-template-e5615bbf0f00659764e6b8c5c4a53b7c_screen.jpg?ts=1634620996"
          alt="logo-gym"
        />
        <div className="first-col">
          <h3 className="text-xl font-semibold mb-4">Athena</h3>
          <p className="text-sm">
            La tua palestra di fiducia per allenarti con le migliori <br /> attrezzature in un ambiente accogliente. Ti aspettiamo!
          </p>
          <ul className="contact-info mt-4 space-y-2">
            <li className="flex items-center">
              {/* Icona Indirizzo */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M12 2C8.134 2 5 5.134 5 9c0 3.866 4.785 9.21 6.353 10.963a1 1 0 001.293 0C14.215 18.21 19 12.866 19 9c0-3.866-3.134-7-7-7zm0 2a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
              <span>Piazza XVIII Dicembre, 123, Torino</span>
            </li>
            <li className="flex items-center">
              {/* Icona Telefono */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M3.654 3.354a2 2 0 012.37-.422l2.678 1.338a2 2 0 01.895.895l1.338 2.678a2 2 0 01-.422 2.37l-1.694 1.694a15.075 15.075 0 006.586 6.586l1.694-1.694a2 2 0 012.37-.422l2.678 1.338a2 2 0 01.895.895l1.338 2.678a2 2 0 01-.422 2.37c-.52.52-1.26.78-2.005.708C7.548 20.88 3.646 17.245 2.708 12.005c-.073-.744.188-1.484.708-2.005L3.654 3.354z" />
              </svg>
              <span>+39 0123 456789</span>
            </li>
            <li className="flex items-center">
              {/* Icona Email */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M1.5 5A1.5 1.5 0 013 3.5h18A1.5 1.5 0 0122.5 5v14A1.5 1.5 0 0121 20.5H3A1.5 1.5 0 011.5 19V5zm2.36 1l8.14 5.287L20.14 6H3.86zm16.64 2.268L13 13.663a1.5 1.5 0 01-1.738 0L3.5 8.268V19h17V8.268z" />
              </svg>
              <span>info@athena.it</span>
            </li>
          </ul>
        </div>

        <div className="second-col ">
          <h3 className="text-xl font-semibold mb-4">Orari di apertura</h3>
          <ul className="text-sm">
            <li>Lunedì - Venerdì: 6:00 - 22:00</li>
            <li>Sabato: 8:00 - 20:00</li>
            <li>Domenica: 9:00 - 18:00</li>
          </ul>
        </div>
        <div className="third-col">
          <h3 className="text-xl font-semibold mb-4">Seguici</h3>
          <ul className="flex  space-x-4">
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors" aria-label="Facebook">
                {/* Icona Facebook */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.991h-2.54v-2.887h2.54V9.797c0-2.507 1.493-3.887 3.777-3.887 1.094 0 2.238.195 2.238.195v2.462h-1.261c-1.243 0-1.63.774-1.63 1.564v1.876h2.773l-.443 2.887h-2.33v6.991C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </li>

            <li>
              <a href="#" className="text-pink-500 hover:text-pink-400 transition-colors" aria-label="Instagram">
                {/* Icona Instagram */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zM16 3.5h-8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4v-8a4 4 0 00-4-4zm-4 5a3 3 0 110 6 3 3 0 010-6zm0 1.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm5.5-3.5a.875.875 0 110 1.75.875.875 0 010-1.75z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
