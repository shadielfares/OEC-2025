import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-black-600 p-6 text-white shadow-md">
      <div className=" mx-auto items-center">

        {/* Links */}
        <div className="md:flex flex-row gap-4 justify-center items-center w-full">
            <div className=" justify-center w-full">
              <div>
                <Link to="/earthquake" className="hover:text-blue-300 mx-2">
                  Earthquakes
                </Link>
              </div>
              <div>
                <Link to="/covid" className="hover:text-blue-300 mx-2">
                  Covid Cases
                </Link>
              </div>
            </div>
        </div>

      </div>

    </nav>
  );
}

export default Navbar;
