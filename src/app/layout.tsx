import "../styles/globals.css";
import Navbar from "./components/Navbar/page";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
