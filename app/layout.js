import { Inter } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Navbar from "../components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Secret Santa",
  description: "Super divertido",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeRegistry>
            <Navbar />
            {children}
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
