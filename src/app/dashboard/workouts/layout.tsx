export default async function WorkoutsLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <main className="flex px-5 w-full">{children}</main>;
}
