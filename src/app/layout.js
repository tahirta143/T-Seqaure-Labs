import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "T Square Labs | Transforming Ideas Into Digital Products",
  description: "T Square Labs is a premium software agency building high-performance mobile apps, web solutions, AI agents, and custom SaaS platforms.",
  keywords: "Flutter Development, React Native, Next.js Development, Full Stack Development, AI Chatbots, AI Agents, SaaS, UI/UX Design",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased lenis-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
