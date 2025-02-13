import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto max-w-4xl min-h-screen">
      <Navbar />
      <div className="px-5 border min-h-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
