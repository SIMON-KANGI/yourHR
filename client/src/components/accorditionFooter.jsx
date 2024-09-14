import { Accordion, AccordionItem, AccordionIcon,AccordionButton,Box, AccordionPanel } from '@chakra-ui/react';
import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { BsTwitterX } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
function AccorditionFooter() {
  return (
    <div className=' m-4 '>
      <Accordion allowToggle size='full'>
        <AccordionItem>
          
            <h2 className='text-stone-200 text-xl'> 
            <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontSize='1.2rem'>
          For Clients
        </Box>
        <AccordionIcon />
      </AccordionButton>
      </h2>
            <AccordionIcon />
          
          <AccordionPanel>
            <ul className='text-stone-100'>
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
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          
        <h2 className='text-white'> <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontSize='1.2rem'>
          For Freelancers
        </Box>
        <AccordionIcon />
      </AccordionButton>
      </h2>
            <AccordionIcon />
         
          <AccordionPanel>
            <ul className='text-stone-100'>
              <li>How to find work</li>
              <li>Direct Contracts</li>
              <li>Find freelance jobs worldwide</li>
              <li>Freelance jobs in the USA</li>
              <li>Win work with ads</li>
              <li>Exclusive resources with Freelance Plus</li>
            </ul>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          
        <h2 className='text-stone-200'> <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontSize='1.2rem'>
          Resources
        </Box>
        <AccordionIcon />
      </AccordionButton>
      </h2>
            <AccordionIcon />
        
          <AccordionPanel>
            <ul className='text-stone-100'>
              <li>Help & support</li>
              <li>Success stories</li>
              <li>Upwork reviews</li>
              <li>Resources</li>
              <li>Blog</li>
              <li>Community</li>
              <li>Affiliate programme</li>
              <li>Free Business Tools</li>
            </ul>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
         
        <h2 className='text-stone-200'> <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontSize='1.2rem'>
         Company
        </Box>
        <AccordionIcon />
      </AccordionButton>
      </h2>
            <AccordionIcon />
          
          <AccordionPanel>
            <ul className='text-stone-100'>
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
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          
        <h2 className='text-stone-200'> <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontSize='1.2rem'>
          My Socials
        </Box>
        <AccordionIcon />
      </AccordionButton>
      </h2>
            <AccordionIcon />
         
          <AccordionPanel>
            <div className="flex">
              <a href="https://github.com/SIMON-KANGI" target="_blank" rel="noopener noreferrer" className="w-12 h-12 mx-2 justify-center flex rounded-full border border-stone-200 items-center">
                <FaGithub color="white" size="24" />
              </a>
              <a href="https://www.linkedin.com/in/simon-mwangi-b22925200/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 mx-2 justify-center flex rounded-full border border-stone-200 items-center">
                <FaLinkedin color="white" size="24" />
              </a>
              <a href="https://portfolio-mu-five-65.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 mx-2 justify-center flex rounded-full border border-stone-200 items-center">
                <TbWorld color="white" size="24" />
              </a>
              <a href="https://x.com/Kangisimo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 mx-2 justify-center flex rounded-full border border-stone-200 items-center">
                <BsTwitterX color="white" size="24" />
              </a>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AccorditionFooter;
