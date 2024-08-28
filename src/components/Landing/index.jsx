import React from "react"
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import chronosLogo from '../../assets/CHRONOS-logo-300dpi.svg';
import './landing.css'
import dayjs from 'dayjs'

function Landing({children}){

    const [timeRightNow, setTimeRightNow] = useState(dayjs().format('HH:mm:ss'));

    useEffect(() => {
        const updateClock = () => {
            setTimeRightNow(dayjs().format('HH:mm:ss'));
        };

        // Set an interval to update the clock every second
        const interval = setInterval(updateClock, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    let suffix = '';

    const dateToday1 = dayjs().format('dddd D');
    const dateToday2 = dayjs().format('MMMM YYYY');

    switch(parseInt(dayjs().format('D'))) {
        case 1:
        case 21:;
        case 31:
            suffix = 'st'
            break;
        case 2: 
        case 22:
            suffix = 'nd'
            break;
        case 3: 
        case 23:
            suffix = 'rd'
            break;
        default: 
            suffix = 'th'
    }

    let completeDate = `${dateToday1}${suffix} ${dateToday2}`;

    const pageWidth = window.innerWidth;
    console.log(`page width: ${pageWidth}`);
    
    return (
    <>

        <div id='landing-container'>
            
            <div id="colour-filter" className="p-1">
                
                <div className="container-fluid py-1" id="content">
                    
                    {pageWidth >= 520 ?  (
                     
                        <div id="landing-banner" className="mb-3"> 
                            <div className="banner-side-item time-container">
                                <p className="banner-text text-center"><a id='time-right-now' target="blank" href="https://www.whattimeisitrightnow.com/">{timeRightNow}</a></p>
                            </div>
                            
                            <Link to='/'><div id="logo-wrapper" className="banner-item d-flex justify-content-center">
                                <img src={chronosLogo} id='chronos-logo' alt="Chronos logo" />
                            </div></Link>
                            
                            <div className="banner-side-item date-container">
                                <p className="banner-text text-center" id="date">{completeDate}</p>
                            </div>
                        </div>

                        ) : (
                            
                        <div id="landing-banner" className="mb-3"> 
                           <Link to='/'><div id="logo-wrapper" className="banner-item d-flex justify-content-center">
                                <img src={chronosLogo} id='chronos-logo' alt="Chronos logo" />
                            </div></Link>
                           
                           <div id="date-time-container">
                                <div className="banner-side-item time-container">
                                    <p className="banner-text text-center"><a id='time-right-now' target="blank" href="https://www.whattimeisitrightnow.com/">{timeRightNow}</a></p>
                                </div>
                                
                                <div className="banner-side-item date-container">
                                    <p className="banner-text text-center" id="date">{completeDate}</p>
                                </div>
                           </div>
                            
                        </div>

                        )

                        }


            {children}
                    

                </div>
            </div>
        </div>
    </>
    )
}

export default Landing;
