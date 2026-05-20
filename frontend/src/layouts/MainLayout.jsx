import Navbar from "../components/navigation/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <Navbar />

      <main>{children}</main>
    </div>
  );
}

export default MainLayout;