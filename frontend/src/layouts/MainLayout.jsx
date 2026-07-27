import Navbar from "../components/customer/Navbar";

function MainLayout({children}){

    return(

        <>

        <Navbar/>

        {children}

        </>

    )

}

export default MainLayout;