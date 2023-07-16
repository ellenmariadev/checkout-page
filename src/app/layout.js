import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Checkout | Wizzi",
  description:
    "É fácil, é tecnológico, isso é futurismo. A experiência Agência de Viagem + Cliente + Digital + Humana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
