import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";

function Home() {
  return (
    <div>
      <Navbar
        title={"Trial Lesson [Grade 1-3]"}
        time={"02:00"}
        counter={true}
      />
      {/* {
        endRequest && 
        <EndClassForm/>
      } */}
    </div>
  );
}

export default Home;
