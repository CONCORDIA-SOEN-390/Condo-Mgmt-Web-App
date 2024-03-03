"use client";
import React, { useState } from "react";
import "./finances.css";
import CondoFinanceInfoBox from "@/components/CondoFinanceComponents/CondoFinancenfoBox";
import { MdDashboard } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdEditSquare } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import Link from "next/link";

function page() {
  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <div className="absolute left-0 bg-sky-300 min-h-screen w-48 rounded-r-lg">
        <div className="flex flex-wrap justify-center">
          <div className=" mt-5 w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-4xl font-bold">J</span>
          </div>
          <div className="text-center mt-2 text-white text-xl font-semibold">
            John Smith
            <Link href={"profile"}>
              <MdDashboard className="ml-10 mt-20 text-white text-3xl" />
              Dashboard
            </Link>
            <Link href={"finances"}>
              <FaChartColumn className="ml-10 mt-2  text-blue-600 text-3xl" />
              <span className="text-blue-600">Finances</span>
            </Link>
            <Link href={"properties"}>
              <FaBuilding className="ml-10 mt-2 text-white text-3xl" />
              Properties
            </Link>
            <IoSettingsSharp className="ml-10 mt-16 text-white text-3xl" />
            Settings
            <IoIosHelpCircle className="ml-10 mt-2 text-white text-3xl" />
            Contact Us
            <FiLogOut className="ml-10 mt-2 text-white text-3xl" />
            Log Out
          </div>
        </div>
      </div>
      <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
        <div className="grid grid-cols-2 bg-sky-300 rounded-t-lg">
          <div className="p-2 font-semibold text-white text-2xl">Finances</div>
          <div className="p-2 flex justify-end items-center text-white text-3xl gap-5">
            <MdEditSquare className="" />
            <MdCancel className="" />
          </div>
        </div>

        <div className="financeMainContainer">
          <div className="CategoryNameContainer">
            <h2>Condo Number</h2>
            <h2>Total Fees(Monthly)</h2>
            <h2>Remaining Balance</h2>
          </div>

          <div>
            <CondoFinanceInfoBox
              condoName="Condo 1"
              monthlyFees={2000.0}
              remainingBalance={1000.0}
            />
            <CondoFinanceInfoBox
              condoName="Condo 2"
              monthlyFees={4500.0}
              remainingBalance={3000.0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
