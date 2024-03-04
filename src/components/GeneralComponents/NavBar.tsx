
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex w-full overflow-hidden fixed top-0 mt-5 bg-[#90c5fd00] transition-colors duration-200">
      <div className="text-[#332d2d] text-1.7rem font-bold pt-4 text-center ml-8">
        <a href="/">Condo360</a>
      </div>

      <div className="text-center mx-auto ml-[360px]">
        <ul className="flex list-none m-0 p-0 w-full">
          <li>
            <Link href="/" className="block text-[#332d2d] text-center px-10 py-5 font-semibold text-1.4rem hover:font-bold">Home</Link>
          </li>
          <li>
            <Link href="/properties" className="block text-[#332d2d] text-center px-10 py-5 font-semibold text-1.4rem hover:font-bold">Properties</Link>
          </li>
          <li>
            <Link href="#" className="block text-[#332d2d] text-center px-10 py-5 font-semibold text-1.4rem hover:font-bold">Contact</Link>
          </li>
          <li>
            <Link href="/login" className="block text-[#332d2d] text-center px-10 py-5 font-semibold text-1.4rem hover:font-bold">Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;