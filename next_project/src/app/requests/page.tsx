
import PublicUserSideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CompanySideBar from "@/components/GeneralComponents/CompanyView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import RequestCompanyView from "@/components/RequestPageComponents/CompanyView/Request";
import {auth} from "@/lib/auth";

async function RequestsPage() {
    const session = await auth()
  // @ts-ignore comment
    const {account_type:page} = session?.user;  


    //------------------------------------FIX PAGE RENDERING HERE------------------------------------
    //const page = 'company';
    // harcoded userId
    //const userId = 13; // employee user   <RequestEmployeeView userId={userId}/>
    //const userId = 1;   // company user  <RequestCompanyView userId={userId}/>
    //const userId = 19;   // condo owner  <RequestPublicView userId={userId} />

    //-----------------------------------------------------------------------------------------------


    // // toggle for add and edit
    // const [showAddRequestForm, setshowAddRequestFormFormStatus] = useState(false);
    // // const toggleFormAdd = () => {
    // //     setshowAddRequestFormFormStatus(!showAddRequestForm);
    // // };

    // const [showEditRequestForm, setshowEditRequestFormFormStatus] = useState(false);
    // // const toggleFormEdit = () => {
    // //     setshowEditRequestFormFormStatus(!showEditRequestForm);
    // // };

    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-white">
            {/*fix rendering here**/}
            {page === 'company'? <CompanySideBar page='requests'/>:<PublicUserSideBar page='requests'/>}
            <div className="absolute w-5/6 right-6 top-5 bottom-5 bg-white shadow-lg rounded-xl">
                <CardHeader title="Assigned Requests">
                    .
                </CardHeader>

                {/*fix rendering here
                there are three different types of pages
                */}

                {/*
<RequestPublicView userId={userId} />

<RequestEmployeeView userId={userId}/>

                */}

                <RequestCompanyView />

            </div>
        </div>
    );
}
export default RequestsPage;