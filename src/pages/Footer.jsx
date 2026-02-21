import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white overflow-hidden"
    >
      {/* subtle background blur circle */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid sm:grid-cols-2 md:grid-cols-4 gap-14">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-extrabold mb-5 tracking-wide">
            Kisan Mitra 🌱
          </h2>
          <p className="text-sm text-emerald-200 leading-relaxed max-w-xs">
            A smart agriculture support platform connecting Farmers,
            Customers, and Agri Experts through a secure and scalable marketplace.
          </p>
        </motion.div>

        {/* Platform */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold text-lg mb-5 relative inline-block after:block after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full">
            Platform
          </h3>
          <ul className="space-y-3 text-sm text-emerald-200">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/aboutsection" },
              { name: "Services", path: "/servicesSection" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="inline-block transition-all duration-300 hover:text-white hover:translate-x-2"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Marketplace */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold text-lg mb-5 relative inline-block after:block after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full">
            Marketplace
          </h3>
          <ul className="space-y-3 text-sm text-emerald-200">
            {[
              { name: "Seeds", path: "/buy-seeds" },
              { name: "Fresh Vegetables", path: "/buy-vegetables" },
              { name: "Agri Consultation", path: "/consult-doctor" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="inline-block transition-all duration-300 hover:text-white hover:translate-x-2"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold text-lg mb-5 relative inline-block after:block after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full">Contact</h3>
          <div className="space-y-4 text-sm text-emerald-200">
            <p className="flex items-center gap-2 hover:text-white transition">
              📧 support@kisanmitra.com
            </p>
            <p className="flex items-center gap-2 hover:text-white transition">
              📞 +91 8374730829
            </p>
            <p className="flex items-center gap-2 hover:text-white transition">
              📍 Telangana, India
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
        className="relative border-t border-emerald-700/50 backdrop-blur-md text-center py-6 text-sm text-emerald-300"
      >
        © {new Date().getFullYear()} Kisan Mitra. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;