import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { BsTwitterX } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
import AccorditionFooter from "./accorditionFooter";

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="lg:w-3/4 w-full h-fit lg:mx-auto mx-2 bg-stone-950 p-16 my-8 rounded-md">
      {/* Full footer for larger screens */}
      <section className="hidden lg:flex justify-around lg:w-full">
        <ul className="text-stone-200">
          <li className="font-semibold">For Clients</li>
          <li>How to hire</li>
          <li>Talent Marketplace</li>
          <li>Project Catalog</li>
          <li>Hire an agency</li>
          <li>Enterprise</li>
          <li>For Clients</li>
          <li>Any hire</li>
          <li>Contract-to-hire</li>
          <li>Hire worldwide</li>
        </ul>
        <ul className="text-stone-200">
          <li className="font-semibold">For Talent</li>
          <li>How to find work</li>
          <li>Direct Contracts</li>
          <li>Find freelance jobs worldwide</li>
          <li>Freelance jobs in the USA</li>
          <li>Win work with ads</li>
          <li>Exclusive resources with Freelance Plus</li>
        </ul>
        <ul className="text-stone-200">
          <li className="font-semibold">Resources</li>
          <li>Help & support</li>
          <li>Success stories</li>
          <li>Upwork reviews</li>
          <li>Resources</li>
          <li>Blog</li>
          <li>Community</li>
          <li>Any hire</li>
          <li>Affiliate programme</li>
          <li>Free Business Tools</li>
        </ul>
        <ul className="text-stone-200">
          <li className="font-semibold">Company</li>
          <li>About us</li>
          <li>Leadership</li>
          <li>Investor relations</li>
          <li>Careers</li>
          <li>Our impact</li>
          <li>Press</li>
          <li>Contact us</li>
          <li>Partners</li>
          <li>Trust, Safety & security</li>
          <li>Modern slavery statement</li>
        </ul>
      </section>

      {/* Social media section visible only on large screens */}
      <section className="my-4 hidden lg:flex items-center lg:w-full">
        <h1 className="text-xl text-stone-200 font-bold">Follow me</h1>
        <div className="flex">
          <Tooltip label="Github">
            <button className="w-12 h-12 mx-2 justify-center flex rounded-full border border-stone-200 items-center">
              <Link to="https://github.com/SIMON-KANGI">
                <FaGithub color="white" size="24" />
              </Link>
            </button>
          </Tooltip>
          <Tooltip label="Linkedin">
            <button className="w-12 h-12 justify-center flex rounded-full border border-stone-200 items-center">
              <Link to="https://www.linkedin.com/in/simon-mwangi-b22925200/">
                <FaLinkedin color="white" size="24" />
              </Link>
            </button>
          </Tooltip>
          <Tooltip label="Portfolio">
            <button className="w-12 mx-2 h-12 flex justify-center rounded-full border border-stone-200 items-center">
              <Link to="https://portfolio-mu-five-65.vercel.app/">
                <TbWorld color="white" size="24" />
              </Link>
            </button>
          </Tooltip>
          <Tooltip label="X">
            <button className="w-12 mx-2 h-12 flex justify-center rounded-full border border-stone-200 items-center">
              <Link to="https://x.com/Kangisimo">
                <BsTwitterX color="white" size="24" />
              </Link>
            </button>
          </Tooltip>
        </div>
      </section>

      {/* Accordion footer for small screens */}
      <section className="lg:hidden w-full">
        <AccorditionFooter />
      </section>
    </div>
  );
}

export default Footer;
