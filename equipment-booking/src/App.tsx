import { BrowserRouter } from "react-router";
import AppContent from "./App/AppContent";

/**
 * The top-level component of the app. It renders an instance of BrowserRouter
 * from react-router-dom, which is necessary for client-side routing to work.
 * The BrowserRouter component contains an instance of AppContent, which
 * determines which routes are displayed and conditionally renders the Navbar and
 * Footer components.
 */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
