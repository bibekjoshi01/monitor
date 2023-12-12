import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Monitor",
  description: "You are under observation!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Add image meta tags */}
        <meta property="og:image" content="../assets/monitor.jpg" />
        <meta property="og:image:width" content="1200px" />
        <meta property="og:image:height" content="600px" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
