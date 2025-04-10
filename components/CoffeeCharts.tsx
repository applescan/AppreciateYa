import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const CoffeeChart = ({
  coffees,
  totalPost,
}: {
  coffees: number;
  totalPost: number;
}) => {
  const symbols = [
    "path://M12.664062 4.0644531C10.733436 3.9724031 9.4312803 6.2487539 10.4375 7.8789062C10.4375 7.8789062 10.4375 7.8808594 10.4375 7.8808594L13.861328 13.673828L7.3691406 33.191406 A 1.50015 1.50015 0 0 0 7.3652344 33.205078C5.8221031 38.005535 9.463671 43 14.505859 43L33.484375 43C38.527324 43 42.168135 38.00553 40.625 33.205078 A 1.50015 1.50015 0 0 0 40.621094 33.191406L34.462891 14.650391 A 1.50015 1.50015 0 0 0 34.560547 14.560547L37.6875 11.433594C38.138623 11.785314 38.707718 12.286991 39.328125 13.0625C40.645287 14.708953 42 17.333333 42 21.5 A 1.50015 1.50015 0 1 0 45 21.5C45 16.666667 43.354713 13.291047 41.671875 11.1875C39.989037 9.083953 38.169922 8.1582031 38.169922 8.1582031 A 1.50015 1.50015 0 0 0 36.439453 8.4394531L34.011719 10.867188L34.011719 9.2695312C34.011719 7.5144483 32.688976 6.0084784 30.947266 5.7949219C21.106626 4.5881646 15.374812 4.1935848 12.664062 4.0644531 z M 13.490234 7.1523438C16.282253 7.2986664 21.327227 7.636568 30.582031 8.7714844C30.83032 8.8019284 31.011719 9.0006144 31.011719 9.2695312L31.011719 12L16.355469 12L13.490234 7.1523438 z M 16.582031 15L31.417969 15L34.40625 24L18.083984 24C17.214984 24 16.445687 24.561672 16.179688 25.388672L13.076172 35.039062C12.871172 35.675063 12.282438 36.082031 11.648438 36.082031C11.496438 36.082031 11.341453 36.058766 11.189453 36.009766C10.40369 35.756808 9.9714093 34.918034 10.21875 34.132812C10.219573 34.130198 10.219865 34.127613 10.220703 34.125L10.220703 34.123047L16.582031 15 z",
  ];
  const bodyMax = totalPost === 0 ? 1 : totalPost;

  const option = {
    tooltip: {},
    xAxis: {
      data: ["Coffees"],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      max: bodyMax,
      offset: 0,
      splitLine: { show: false },
      axisLabel: {
        show: false,
        inside: false,
      },
    },
    grid: {
      left: "auto",
      right: "5%",
      top: "middle",
      containLabel: true,
      height: "70%",
      width: "auto",
    },
    markLine: {
      z: -100,
    },
    series: [
      {
        type: "pictorialBar",
        symbolClip: true,
        symbolBoundingData: bodyMax,
        itemStyle: {
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowBlur: 3,
          shadowOffsetX: 3,
          shadowOffsetY: 6,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0.4, color: "#ca8a04" },
            { offset: 1, color: "#713f12" },
          ]),
        },
        data: [
          {
            value: coffees,
            symbol: symbols[0],
          },
        ],
        z: 10,
        tooltip: {
          show: false,
        },
      },
      {
        name: "Total Kudos",
        type: "pictorialBar",
        symbolBoundingData: bodyMax,
        animationDuration: 0,
        itemStyle: {
          color: "#e4e4e7",
          shadowColor: "rgba(0, 0, 0, 0.1)",
          shadowBlur: 3,
          shadowOffsetX: 3,
          shadowOffsetY: 6,
        },
        data: [
          {
            value: bodyMax,
            symbol: symbols[0],
          },
        ],
        tooltip: {
          show: false,
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 200, width: 200 }} />;
};

export default CoffeeChart;
