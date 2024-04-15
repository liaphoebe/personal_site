import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Julia Sarris",
  description: "Julia Sarris Personal Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
      <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 p-3 sticky top-0 shadow-md">
        <div className="flex items-center justify-start text-sky-200 text-4xl italic pl-4 py-2">
          Julia Phoebe Sarris
        </div>
      </div>
      <div className={inter.className}>{children}</div>
      <a href="https://www.linkedin.com/in/julia-sarris-4550032ab/" target="_blank" rel="noopener noreferrer">
        <button className="fixed bottom-5 right-5 p-4 w-20 h-20 cursor-pointer rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-700 flex items-center justify-center">
          <svg
            className="w-full h-full" // This will make the SVG fill the entire button space minus padding
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            <path
              d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
            />
          </svg>
        </button>
      </a>

      </body>
      
    </html>
  );
}
