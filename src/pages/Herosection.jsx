import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Leaf, Sun, Droplets } from "lucide-react";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren:0.
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

function HeroSection() {
  return (
    <div className="overflow-x-hidden">

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-linear-to-b from-green-50 to-emerald-100"
      >
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Background blobs — slow floating */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-leaf-green blur-3xl" />
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          className="absolute top-32 left-[15%] opacity-20"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <Leaf className="w-16 h-16 text-primary" />
        </motion.div>

        <motion.div
          className="absolute top-48 right-[20%] opacity-20"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <Sun className="w-12 h-12 text-wheat-gold" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-[25%] opacity-20"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Droplets className="w-10 h-10 text-sky-blue" />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto text-center"
          >

            {/* Badge */}
            <motion.div
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/60 border border-primary/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                Empowering Farmers Across India
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            >
              Start Farming <span className="text-gradient">Smarter</span>
              <br />
              Today
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Connect with agricultural experts, access quality seeds, transport
              your harvest, and grow your farming business with our
              comprehensive platform.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/loginselection"
                  className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white text-lg font-semibold rounded-xl shadow-md transition-all inline-block"
                >
                  🌱 Start Farming Smarter
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>

            {/* Roles */}
            <motion.div variants={fadeUp} className="mt-8">
              <p className="text-sm text-muted-foreground mb-4">Join as</p>

              <div className="flex flex-wrap justify-center gap-4">
                {["Farmer", "Customer", "Doctor", "Admin"].map((role, i) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium cursor-pointer hover:border-primary hover:text-primary"
                  >
                    {role}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <section id="aboutsection">
        <AboutSection />
      </section>

      <section id="servicesSection">
        <ServicesSection />
      </section>
    </div>
  );
}

export default HeroSection;
