import Navbar from "@/components/navbar";
import AuthProvider from "@/providers/auth-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="mx-auto max-w-4xl min-h-screen">
        <Navbar />
        <div className="px-5 min-h-full">
          <Component {...pageProps} />
        </div>
      </div>
    </AuthProvider>
  );
}
