import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, hideHeader = false, hideFooter = false }) => (
  <div className="min-h-screen flex flex-col bg-white">
    {!hideHeader && <Header />}
    <main className="flex-1">{children}</main>
    {!hideFooter && <Footer />}
  </div>
);

export default Layout;
