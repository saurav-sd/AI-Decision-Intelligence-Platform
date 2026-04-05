import './globals.css';

export const metadata = {
  title: 'InsightAI',
  description: 'AI Decision Intelligence Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0B0F19] text-white">{children}</body>
    </html>
  );
}
