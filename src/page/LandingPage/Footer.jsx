import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaGlobe } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
<footer class="footer-distributed">

			<div class="footer-left">

				<h3>Star tasks</h3>

				<p class="footer-links">
					<a href="#home" class="link-1">Home</a>
					
					<a href="#features">Features</a>
				
					<a href="#about">About</a>
					
					<a href="#contact">Contact</a>
				</p>

				<p class="footer-company-name">Star-tasks © 2015</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>Km 11, Lekki-Epe Expressway</span> Ikota first gate, Ajah, Lagos.</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+234 809 334 4491</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:niittfortesoft.com">niitfortesoft.com</a></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the company</span>
					We help you plan your day, and manage your time effectively. With star tasks you get a super power; time control.
				</p>

				<div class="footer-icons">

					<a href="#"><i class="fa fa-facebook"></i></a>
					<a href="#"><i class="fa fa-twitter"></i></a>
					<a href="#"><i class="fa fa-linkedin"></i></a>
					<a href="#"><i class="fa fa-github"></i></a>

				</div>

			</div>

		</footer>
  );
};

export default Footer;