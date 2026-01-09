
import React from 'react'

const AboutSection = () => {
  return (
   <div>
<section
  id="aboutsection"
  className="min-h-screen scroll-mt-24 bg-green-50 px-6 py-16 flex items-center"
>
  <div className="max-w-6xl mx-auto w-full">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* LEFT CONTENT */}
      <div>
        <div className="flex justify-center lg:justify-start mb-20">
          <span className="inline-block bg-green-100 text-green-700 text-2xl font-serif font-bold px-6 py-4 rounded-full">
            About Us
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-green-900 leading-tight mb-6">
          Transforming Agriculture <br />
          <span className="text-green-700">Together</span>
        </h2>

        <p className="text-gray-600 mb-4">
          Kisan Mitra is a comprehensive agricultural platform dedicated to
          empowering farmers with technology, knowledge, and resources.
        </p>

        <p className="text-gray-600 mb-6">
          We connect farmers with experts, customers, and essential services —
          from seed selection to harvest transportation.
        </p>

        <button className="bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition">
          Learn Our Story
        </button>
      </div>

      {/* RIGHT STATS */}
      <div className="grid grid-cols-2 gap-6">
        {[
          ["10,000+", "Active Farmers"],
          ["500+", "Crop Varieties"],
          ["95%", "Success Rate"],
          ["50+", "Districts Covered"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="bg-white rounded-xl p-6 text-center shadow-sm"
          >
            <h3 className="text-2xl font-bold text-green-900">{value}</h3>
            <p className="text-gray-500 text-sm mt-2">{label}</p>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>

</div>

  )
}

export default AboutSection

