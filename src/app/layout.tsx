import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alliance file uploader",
  description: "Upload files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
