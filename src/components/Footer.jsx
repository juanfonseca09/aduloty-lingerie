import React from 'react'
import './Footer.css'
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import {
    MDBFooter,
    MDBContainer
  } from 'mdb-react-ui-kit';

export const Footer = () => {
  return (
    <MDBFooter className='text-center footer'>
      <MDBContainer className='p-3'>
        <section className='social-ntwk m-2'>
        

<button
  className='m-3 social'
  onClick={() => window.open('', '_blank')}
>
  <FaInstagram size={25} />
</button>

        </section>
    </MDBContainer>
  </MDBFooter>
);
}