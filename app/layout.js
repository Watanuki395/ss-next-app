import { Inter } from "next/font/google";
import { Suspense } from "react";
import { AuthProvider } from "./context/AuthContext";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Navbar from "../components/Navbar/Navbar";
import Loading from "./loading";

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
        <Suspense fallback={<Loading />}>
          <AuthProvider>
            <ThemeRegistry>
              <Navbar />
              {children}
            </ThemeRegistry>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
