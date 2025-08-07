import GlitchText from "@/components/react-bits/GlitchText";
import React from "react";

const TestPage = () => {
  return (
    <React.Fragment>
      <div className="border h-[100vh] flex flex-col justify-center">
        <GlitchText
          speed={0.5}
          enableShadows={true}
          enableOnHover={false}
          className="custom-class"
        >
          Funny
        </GlitchText>
      </div>
    </React.Fragment>
  );
};

export default TestPage;
