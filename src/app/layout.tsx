import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "./providers";

export const metadata = {
  title: "iPhone Store",
  description: "Buy iPhones online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Add favicon link here */}
        <link rel="icon" href="/public/download (8).png" type="image/png" />
        {/* Or if it's .ico file */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
