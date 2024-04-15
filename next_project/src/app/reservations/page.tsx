
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanyViewPage from "@/components/ReservationPageComponents/CompanyView/CompanyViewPage";

async function ReservationsPage() {

  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      <SideBar page="reservations" />
      <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
        <CompanyViewPage />    
      </div>
    </div>
  );
}

export default ReservationsPage;
