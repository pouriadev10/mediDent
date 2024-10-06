import {
    Row
} from "antd";
import React, { useEffect, useState } from 'react';
import ProviderDetailCard from "./ProviderDetailCard";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const ProviderPart = (props) => {
    const [showAllProvider, setShowAllProvider] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const swithShowProvider = () => {
        setShowAllProvider(!showAllProvider)
    }

    return (
        <div className="mt25">
            <Row>
                <span className='profile-clinic-section-title'>
                    Providers
                </span>
            </Row>
            <Row>
                <span className='profile-clinic-section-subtitle'>
                    All providers have official documents that can be presented, which is approved by our team
                </span>
            </Row>

            {
                props.provider && props.provider.length > 0 ? (
                    <>
                        {props.provider.map((provider, i) => (
                            <>
                                {
                                    i >= 5 && showAllProvider ?
                                        <ProviderDetailCard provider={provider} />
                                        :
                                        i >= 5 && !showAllProvider ?
                                            <></>
                                            :
                                            <ProviderDetailCard provider={provider} />
                                }
                            </>

                        ))}
                        <Row type="flex" justify="center">
                            {
                                props.provider && props.provider.length > 5 ?
                                    < button
                                        onClick={swithShowProvider}
                                        style={{
                                            minWidth: "150px",
                                            fontWeight: "bold",
                                            fontSize: "14px",
                                            minHeight: "40px"

                                        }}
                                        className='book-clinic-button-card'>
                                        {
                                            showAllProvider ? "View More" : "View Less"
                                        }
                                    </button>
                                    :
                                    <></>
                            }


                        </Row>
                    </>
                )
                    :
                    <div className='card-membership'>
                        There isn't any provider
                    </div>
            }

        </div >

    )
}

export default ProviderPart;