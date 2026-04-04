import "./globals.css";

export const metadata = {
  title: "Publishing OS",
  description: "Get Paid From Your Music",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
