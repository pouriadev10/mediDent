import React, { useEffect, useState } from 'react'
import {controller} from "../../controller"
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const PoweredBy = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [serverLogo, setServerLogo] = useState("")
  const getLogo = async () => {
    const response = await controller.getLogo()
    setServerLogo(response.data.dark)
  }

  useEffect(() => {
    getLogo()
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className='poweredByBody'>
      <span className='poweredBy'>powered by <img src={serverLogo} style={
        windowDimensions ?
          windowDimensions.width > "700" ?
            { maxWidth: "100px", maxHeight: "20px", marginLeft: "4px" }
            :

            { maxWidth: "80px", maxHeight: "15px", marginLeft: "4px" }
          :
          {}

      } /></span>
    </div>
  )

}

export default PoweredBy