
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex w-full overflow-hidden fixed top-0 pb-1 bg-gradient-to-b from-sky-50 to-transparent">
      <div className="text-[#332d2d] text-2xl font-bold pt-5 text-center ml-8">
        <a href="/">Condo360</a>
      </div>

      <div className="text-center mx-auto ml-[500px]">
        <ul className="flex list-none m-0 p-0 w-full">
          <li>
            <Link href="/" className="block text-[#332d2d] text-center px-10 py-6 font-semibold text-xl hover:font-bold">Home</Link>
          </li>
          <li>
            <Link href="#" className="block text-[#332d2d] text-center px-10 py-6 font-semibold text-xl hover:font-bold">Contact Us</Link>
          </li>
          <li>
            <Link href="/login" className="block text-[#332d2d] text-center px-10 py-6 font-semibold text-xl hover:font-bold">Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;