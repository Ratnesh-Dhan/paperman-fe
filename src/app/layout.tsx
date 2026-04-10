import { Toaster } from "react-hot-toast";
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
        {/* <div className="relative"> */}

        <Toaster position="top-center"/>
        {/* <div className="absolute z-20 left-1/2 -translate-x-1/2"> */}

        <Navbar />
        {/* </div> */}
        {children}
        {/* </div> */}
      </body>
    </html>
  );
}
