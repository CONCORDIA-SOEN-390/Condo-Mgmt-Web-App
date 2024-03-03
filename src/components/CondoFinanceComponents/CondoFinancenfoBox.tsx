"use client";
import React from "react";
import { MdEditSquare } from "react-icons/md";
import "./CondoFinanceInfoBox.css";

interface CondoFinanceInfoBoxProps {
  condoName: string;
  monthlyFees: number;
  remainingBalance: number;
}

const CondoFinanceInfoBox: React.FC<CondoFinanceInfoBoxProps> = ({
  condoName,
  monthlyFees,
  remainingBalance,
}) => {
  return (
    <div>
      <div className="mainContainer">
        <div className="InfoBoxContainer">
          <div className="row">
            <div className="title">Condo Name:</div>
            <div className="Info">{condoName}</div>
          </div>
          <div className="row">
            <h2 className="title">Total Fees:</h2>
            <div className="Info">{monthlyFees} $</div>
          </div>
          <div className="row">
            <h2 className="title">Remaining Balance:</h2>
            <div className="Info">{remainingBalance} $</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CondoFinanceInfoBox;
