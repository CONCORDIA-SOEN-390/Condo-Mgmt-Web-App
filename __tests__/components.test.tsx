import { render, screen } from "@testing-library/react";
import CondoFinanceInfoBox from "@/components/CondoFinanceComponents/CondoFinancenfoBox";



describe("CondoFinanceInfoBox component", () => {
    const condoName = "Condo 1";
    const monthlyFees = 2000.0;
    const remainingBalance = 1000.0;

    test("renders correctly", () => {
        render(
            <CondoFinanceInfoBox
                condoName={condoName}
                monthlyFees={monthlyFees}
                remainingBalance={remainingBalance}
            />
        );

        expect(screen.getByText("Condo Name:")).toBeInTheDocument();
        expect(screen.getByText(condoName)).toBeInTheDocument();
        expect(screen.getByText("Total Fees:")).toBeInTheDocument();
        expect(screen.getByText(`${monthlyFees} $`)).toBeInTheDocument();
        expect(screen.getByText("Remaining Balance:")).toBeInTheDocument();
        expect(screen.getByText(`${remainingBalance} $`)).toBeInTheDocument();
    });

    test("displays correct info", () => {
        render(
            <CondoFinanceInfoBox
                condoName={condoName}
                monthlyFees={monthlyFees}
                remainingBalance={remainingBalance}
            />
        );

        // check correct info displayed
        expect(screen.getByText(condoName)).toBeInTheDocument();
        expect(screen.getByText(`${monthlyFees} $`)).toBeInTheDocument();
        expect(screen.getByText(`${remainingBalance} $`)).toBeInTheDocument();
    });
});
