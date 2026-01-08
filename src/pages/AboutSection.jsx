import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-[#fafaf5] px-6 md:px-16 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <span className="flex items-center justify-center bg-green-100 text-green-700 text-2xl font-bold px-4 py-1 rounded-full mb-5">
            About Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight mb-6">
            Transforming Agriculture <br />
            <span className="text-green-700">Together</span>
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Kisan Mitra is a comprehensive agricultural platform dedicated to
            empowering farmers with technology, knowledge, and resources.
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We connect farmers with experts, customers, and essential services —
            from seed selection to harvest transportation.
          </p>

          <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl transition">
            Learn Our Story
          </button>
        </div>

        {/* RIGHT STATS */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#f3f4ee] rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-green-900">10,000+</h3>
            <p className="text-gray-600 text-sm mt-2">Active Farmers</p>
          </div>

          <div className="bg-[#f3f4ee] rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-green-900">500+</h3>
            <p className="text-gray-600 text-sm mt-2">Crop Varieties</p>
          </div>

          <div className="bg-[#f3f4ee] rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-green-900">95%</h3>
            <p className="text-gray-600 text-sm mt-2">Success Rate</p>
          </div>

          <div className="bg-[#f3f4ee] rounded-2xl p-8 text-center">
            <h3 className="text-3xl font-bold text-green-900">50+</h3>
            <p className="text-gray-600 text-sm mt-2">Districts Covered</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
