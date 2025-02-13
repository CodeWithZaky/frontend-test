import Navbar from "@/components/navbar";
import AuthProvider from "@/providers/auth-provider";
import ThemeProvider from "@/providers/theme-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="mx-auto max-w-4xl min-h-screen">
          <Navbar />
          <div className="px-5 min-h-full">
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
