import React, { useEffect } from 'react';
import "./ErrorStyle.css"
export default function Error500() {

  useEffect(() => {
    if (sessionStorage.getItem("guest_token")) {
      sessionStorage.removeItem("guest_token")
    }

  }, []);

  return (
    <>
      <div id="main1">
        <div class="fof">
          <h1 className="my_h1" style={{ color: "#888" }}>Error 500 - internal server error</h1>
          <div class="size1 monster"></div>
        </div>
      </div>
    </>
  )
}