import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Monitor",
  description: "You are under observation!",
  imageUrl: "../assets/monitor.jpg", // Replace with your image URL
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Title and description */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Open Graph tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={metadata.imageUrl} />

        {/* Twitter tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.imageUrl} />

        {/* Fonts */}
        <style dangerouslySetInnerHTML={{ __html: inter.styles }} />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
