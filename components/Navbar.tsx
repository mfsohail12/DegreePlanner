import Image from "next/image";
import Link from "next/link";

const Navbar = ({ isHome }: { isHome: boolean }) => {
  return (
    <nav className="w-screen bg-light-grey h-14 border-b-[0.5px] flex text-xl px-6 items-center justify-between">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/Logo.png"
          width={60}
          height={60}
          alt="Degree Planner Logo"
        />
        <h1 className="font-bold">DegreePlanner</h1>
      </Link>
      <span className="flex gap-4">
        <Link
          href="/suggest-program"
          className="text-sm font-semibold hover:text-mcgill-red"
        >
          Can't Find Your Program?
        </Link>
        <Link
          href="/contact"
          className="text-sm font-semibold hover:text-mcgill-red"
        >
          Contact
        </Link>
        <Link
          href="/about"
          className="text-sm font-semibold hover:text-mcgill-red"
        >
          About
        </Link>
      </span>
    </nav>
  );
};

export default Navbar;
