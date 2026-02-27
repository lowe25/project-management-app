export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // no navbar, aside, or footer on signup page
  return <>{children}</>;
}
