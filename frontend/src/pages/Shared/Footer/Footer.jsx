import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg--white text-blue-900 pt-12 pb-6 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Branding */}
        <div>
          <h3 className="text-2xl font-extrabold text-blue-800 mb-3">CampusNest</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Your trusted platform to explore top colleges, admission info, and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-700">
            <li><Link to="/" className="hover:text-blue-500 transition">Home</Link></li>
            <li><Link to="/colleges" className="hover:text-blue-500 transition">Colleges</Link></li>
            <li><Link to="/admission" className="hover:text-blue-500 transition">Admission</Link></li>
            <li><Link to="/my-college" className="hover:text-blue-500 transition">My College</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <p className="text-blue-700 text-sm mb-1">📧 support@campusnest.com</p>
          <p className="text-blue-700 text-sm">📞 +1 (800) 123-4567</p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-10 text-sm text-blue-500 border-t border-blue-100 pt-4">
        &copy; {new Date().getFullYear()} CampusNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
