import "bootstrap/dist/css/bootstrap.min.css";

import Providers from "./providers";

export const metadata = {
  title: "iPhone Store",
  description: "Buy iPhones online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
