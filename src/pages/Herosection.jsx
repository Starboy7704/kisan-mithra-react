import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sun, Droplets } from "lucide-react";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";

function HeroSection() {
  return (
    <div>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-linear-to-b from-green-50 to-emerald-100"
      >
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-earth-gradient" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-leaf-green blur-3xl" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 left-[15%] animate-float opacity-20">
          <Leaf className="w-16 h-16 text-primary" />
        </div>
        <div
          className="absolute top-48 right-[20%] animate-float opacity-20"
          style={{ animationDelay: "2s" }}
        >
          <Sun className="w-12 h-12 text-wheat-gold" />
        </div>
        <div
          className="absolute bottom-32 left-[25%] animate-float opacity-20"
          style={{ animationDelay: "4s" }}
        >
          <Droplets className="w-10 h-10 text-sky-blue" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/60 border border-primary/20 mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                Empowering Farmers Across India
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              Start Farming <span className="text-gradient">Smarter</span>
              <br />
              Today
            </h1>

            {/* Subheading */}
            <p
              className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Connect with agricultural experts, access quality seeds, transport
              your harvest, and grow your farming business with our
              comprehensive platform.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                to="/loginselection"
                className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white text-lg font-semibold rounded-xl shadow-md transition-all"
              >
                🌱 Start Farming Smarter
              </Link>

              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>

            {/* User Roles */}
            <div
              className="mt-8 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <p className="text-sm text-muted-foreground mb-4">Join as</p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Farmer", "Customer", "Doctor", "Admin"].map((role) => (
                  <span
                    key={role}
                    className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--card))"
            />
          </svg>
        </div>
      </section>

      {/* aboutsection */}

      <section id="aboutsection">
        <AboutSection />
      </section>

      {/* services section */}
      <section id="servicesSection">
        <ServicesSection />
      </section>
    </div>
  );
}

export default HeroSection;
