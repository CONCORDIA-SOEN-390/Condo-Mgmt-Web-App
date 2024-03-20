import Link from "next/link";
import React, { useState } from "react";

const Footer = () => {

    return (
        <footer className="flex w-full bottom-0 left-0 z-20 p-4 bg-sky-50 mt-10 mb-0 border-0 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-white-800 dark:border-white-600">
            <span className="text-sm text-black sm:text-center dark:text-gray-400">© 2024 <a href="/" className="hover:underline">Condo360™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-black dark:text-gray-500 sm:mt-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="/contact" className="hover:underline">Contact</a>
                </li>
            </ul>
        </footer>
    );
  };
  
  export default Footer;