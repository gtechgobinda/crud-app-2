import React from "react";

const Loader = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <img src="./loader.svg" alt="loader" width={100} height={100} />
      </div>
    </>
  );
};

export default Loader;
