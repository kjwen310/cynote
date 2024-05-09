import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const LandingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-screen bg-slate-200">
      <Navbar />
      <main className="pt-40 pb-40 bg-slate-200">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
