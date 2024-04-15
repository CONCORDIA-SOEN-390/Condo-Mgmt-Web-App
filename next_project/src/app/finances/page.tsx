
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanyViewPage from "@/components/FinancePageComponents/CompanyView/CompanyViewPage";
import {auth} from "@/lib/auth"


async function FinancesPage() {

  const session = await auth()
  // @ts-ignore comment
  const {user_id:userId, account_type:page} = session?.user

  return (
      <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
          {page === 'company'? <CompanySideBar page='properties'/> : <PublicUserSideBar page='properties'/>}
          <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
             {/*{<CondoOwnerViewPage userId={userId}/> }:*/} <CompanyViewPage userId={userId} />
          </div>
      </div>
  );
}
export default FinancesPage;
