"use client";
import { IoIosBackspace } from "react-icons/io";
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import UnitsTable from "@/components/UnitsPageComponents/UnitsTable";
import { useRouter } from 'next/navigation'

interface Props{
  propertyName: string;
}

const UnitsPage: React.FC<Props> = ({propertyName}) => {
  const page = 'company'; // company or anything for user
  const router = useRouter()

  return (
    <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
      {page === 'company'? <CompanySideBar page='properties'/> : <PublicUserSideBar page='properties'/>}
      <div className="absolute w-5/6 inset-y-0 right-5 bg-white shadow-lg rounded-xl">
        <CardHeader title={'Units'}>
            <button onClick={() => router.push('/properties')}><IoIosBackspace/></button>
        </CardHeader>
        <UnitsTable/>
      </div>
    </div>
  );
}

export default UnitsPage;