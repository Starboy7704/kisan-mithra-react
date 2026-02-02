import React from "react";
import ReactECharts from "echarts-for-react";

const UsersOverviewChart = ({ stats}) => {
  const option = {
    title: {
      text: "Users Stats",
    //   subtext: "from DataBase",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "bottom",
    //   textStyle: {
    //     color: isDark ? "#e5e7eb" : "#374151",
    //   },
    },
    series: [
      {
        name: "Users",
        type: "pie",
        radius: "60%",
        data: [
          { value: stats.farmers, name: "Farmers" },
          { value: stats.experts, name: "Agri Experts" },
          {
            value: stats.totalUsers - stats.farmers - stats.experts,
            name: "Customers",
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border">
      <h3 className="font-semibold mb-4">👥 User Distribution</h3>

      <ReactECharts
        option={option}
        style={{ height: "300px", width: "100%" }}
      />
    </div>
  );
};

export default UsersOverviewChart;
