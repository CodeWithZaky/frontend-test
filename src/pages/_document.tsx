import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-300 dark:bg-zinc-900 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
