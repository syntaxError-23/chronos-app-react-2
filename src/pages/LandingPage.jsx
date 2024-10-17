import React from "react";
import {Link} from 'react-router-dom'
import Landing from '../components/Landing'
import Messages from "../components/Messages";


function LandingPage() {
    return(
        <>
            <Landing>
                <div id="tagline-wrapper">
                    <h1 id="tagline" className="text-center my-5">FULL CONTROL AROUND THE CLOCK</h1>
                </div>

                <Messages/>

                <div className="link-btn-wrapper mb-5">
                    <Link to='/schedule'><button className="link-btn mx-1 mt-4">Schedule</button></Link>
                </div>
            </Landing>
        </>
    )
}

export default LandingPage;