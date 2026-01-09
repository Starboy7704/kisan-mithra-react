import React from "react";
import {
  Leaf,
  Truck,
  ShoppingBasket,
  MessageCircle,
  FlaskConical,
  Tractor,
} from "lucide-react";

const services = [
  {
    title: "Seeds Market",
    description:
      "Access premium quality seeds from certified suppliers. Browse a wide variety of crops suited for your region.",
    icon: Leaf,
    bg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    title: "Harvest Transport",
    description:
      "Reliable transportation services for your harvest goods. Connect with verified transport providers.",
    icon: Truck,
    bg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Vegetable Selling",
    description:
      "Direct marketplace to sell your fresh produce. Get fair prices without middlemen.",
    icon: ShoppingBasket,
    bg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    title: "Online Consultancy",
    description:
      "Expert agricultural advice at your fingertips. Connect with specialists for crop-specific guidance.",
    icon: MessageCircle,
    bg: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  {
    title: "Pesticides Store",
    description:
      "Quality-assured pesticides and fertilizers. Safe products with proper usage guidelines.",
    icon: FlaskConical,
    bg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Book Vehicles",
    description:
      "Reserve agricultural machinery and vehicles. Tractors, harvesters, and more on demand.",
    icon: Tractor,
    bg: "bg-stone-200",
    iconColor: "text-stone-700",
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-[#fafaf5] py-20 px-6 md:px-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block bg-green-100 text-green-700 text-2xl font-semibold px-6 py-4 rounded-full mb-4">
          Our Services
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
          Everything You Need to{" "}
          <span className="text-green-700">Grow</span>
        </h2>

        <p className="text-gray-600 text-lg">
          Comprehensive agricultural services designed to support farmers at
          every stage of their journey.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="bg-[#fbfbf7] border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 ${service.bg}`}
              >
                <Icon className={`w-6 h-6 ${service.iconColor}`} />
              </div>

              <h3 className="text-xl font-semibold text-green-900 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
