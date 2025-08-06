import Image from "next/image";
import React from "react";

const QueryArea = () => {
  return (
    <React.Fragment>
      <div className="w-2/3 border rounded-[30px]">
        <textarea
          placeholder="Asks question based on you docs.."
          className="w-full h-[15vh] p-5 rounded-t-2xl focus:outline-none resize-none"
        />
        <div className="flex flex-row-reverse p-3">
          <button className="rounded-full hover:shadow-[0px_0px_10px_rgba(128,128,128,0.5)]">
            <Image
              src={"/icon_white_fixed.png"}
              alt="icon"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default QueryArea;
