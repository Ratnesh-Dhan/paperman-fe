import GlitchText from "@/components/react-bits/GlitchText";
import React from "react";

const Custom404 = () => {
  return (
    <React.Fragment>
      <div className="h-[100vh] flex items-center justify-center bg-slate-800">
        {/* <GlitchText speed={0.5} enableShadows={true} enableOnHover={false}> */}
        <GlitchText className="text-9xl font-bold text-white">404.</GlitchText>
      </div>
    </React.Fragment>
  );
};

export default Custom404;
