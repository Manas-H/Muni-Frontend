import React from "react";

const Footer = () => {
  return (
    <div className="w-full">
      <div className="py-10 bg-[#0a294f] w-full">
        <div>
          <div className="flex flex-col md:flex-row md:items-start justify-between">
            <div className="md:w-[50%] mx-10">
              <div className="flex flex-col items-start">
                <div className="footer-div">
                  <img
                    width="80px"
                    src="http://myseagull.ai/AssetsNew/seagull_logo_white.png"
                    className="logo"
                    alt=""
                  />
                </div>
                <p className="text-left text-[#858b9f] py-2">
                  Providing end-to-end solutions for educational institutes and
                  employers to streamline the graduate hiring process, enhancing
                  efficiency and outreach.
                </p>
                <div className="text-[#858b9f] py-2">
                  <p>
                    <a href="mailto:contact@myseagull.ai">
                      {" "}
                      contact@myseagull.ai{" "}
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 md:mt-2 mx-10">
              <ul className="text-white grid grid-cols-1 md:grid-cols-3 gap-24">
                <li className="">
                  <strong>Solutions For</strong>
                  <nav className="flex flex-col mt-4">
                    <a className="py-3" href="employer.php">
                      Employers
                    </a>
                    <a className="py-3" href="institute.php">
                      Universities
                    </a>
                  </nav>
                </li>
                <li>
                  <strong>Policies</strong>
                  <nav className="flex flex-col mt-4">
                    <a className="py-3" href="privacy-policy.php">
                      Privacy Policy
                    </a>
                    <a
                      className="py-3"
                      href="https://myseagull.ai/terms-of-use.php"
                    >
                      Terms of Use
                    </a>
                  </nav>
                </li>
                <li>
                  <strong>Get in touch</strong>
                  <nav className="flex flex-col mt-4">
                    <a
                      className="py-3"
                      href="https://myseagull.ai/contact-us.php"
                    >
                      Contact us
                    </a>
                  </nav>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#333] py-4">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between mx-10">
            <div className="text-[#858b9f] mb-3 md:mb-0">
              <p className="mb-0">
                © All rights reserved by My Seagull Limited. Registered in
                England No. 14894054.
              </p>
            </div>

            <div className="">
              <ul className="grid grid-cols-3 gap-10 items-center">
                <li className="md:bg-[#6060605e] p-1.5 rounded-md cursor-pointer">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://twitter.com/myseagull"
                  >
                    <img
                      src="https://myseagull.ai/inc1/logo-black.png"
                      alt="linkedin"
                      className="w-5"
                    />
                  </a>
                </li>
                <li className="md:bg-[#6060605e] p-1.5 rounded-md cursor-pointer">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.instagram.com/myseagull.ai"
                  >
                    <img
                      src="https://myseagull.ai/inc1/Instagram_Glyph_Gradient.png"
                      alt="linkedin"
                      className="w-5"
                    />
                  </a>
                </li>
                <li className="md:bg-[#6060605e] p-1.5 rounded-md cursor-pointer">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/company/myseagull/"
                  >
                    <img
                      src="https://myseagull.ai/inc1/LI-In-Bug.png"
                      alt="linkedin"
                      className="w-5"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
