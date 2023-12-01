import { Suspense } from "react";
import { AuthProvider } from "./context/AuthContext";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Navbar from "../components/Navbar/Navbar";
import Loading from "./loading";

export const metadata = {
  title: "Secret Santa",
  description: "Super divertido",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
