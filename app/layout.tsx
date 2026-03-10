// Minimal root layout required by Next.js.
// The real layout (html/body, providers, fonts) lives in app/[locale]/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
