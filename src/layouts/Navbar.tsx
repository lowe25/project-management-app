import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <header className="p-5 border-b">
        <nav className="flex justify-between">
          <ul>
            <li className="flex gap-1">
              <h3 className="font-bold">Welcome:</h3>
              <p> User Type</p>
            </li>
          </ul>
          <ul className="flex  justify-end gap-[10]">
            <li>
              <Link href="/dashboard">Home</Link>
            </li>
            <li>
              <Link href="/edit-project">Edit Account</Link>
            </li>
            <li>
              <Link href="/">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
