export default async function SessionLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <main className="flex flex-col px-5 w-full gap-4">{children}</main>;
}
