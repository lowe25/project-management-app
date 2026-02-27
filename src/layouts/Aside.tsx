import Link from "next/link";

export default function Aside() {
  return (
    <>
      <aside className="border-r h-screen max-w-[300] w-full flex flex-col gap-[10] p-[20]">
        <Link href="project-management">Project Management</Link>
        <Link href="task-management">Task Management</Link>
      </aside>
    </>
  );
}
