import { BiSolidCoupon } from "react-icons/bi";

export const cartChartData = {
  unit: " باقة ",
  title: "الكروت المكتسبة",
  color: {
    backGround: "linear-gradient(180deg, #00919D 0%, #00929D 100%)",
    boxShadow: "0px 10px 20px 0px #FDC0C7",
  },
  barValue: 100,
  value: "18/9",
  png: BiSolidCoupon,
  series: [
    {
      name: "عدد الكروت التي تم شراؤها",
      data: [2, 8, 9],
    },
    {
      name: "عدد الكروت التي لم يتم شراؤها",
      data: [3, 5, 18],
    },
  ],
  loading: true,
  options: {
    chart: {
      type: "area",
      height: "auto",
    },

    dropShadow: {
      enabled: false,
      enabledOnSeries: undefined,
      top: 0,
      left: 0,
      blur: 3,
      color: "#000",
      opacity: 0.35,
    },

    fill: {
      type: "gradient",
      // type: "gradient",
      // gradient: {
      //   shade: "dark",
      //   type: "horizontal",
      //   shadeIntensity: 0.5,
      //   gradientToColors: true, // optional, if not defined - uses the shades of same color in series
      //   inverseColors: true,
      //   opacityFrom: 1,
      //   opacityTo: 1,
      //   stops: [0, 50, 100],
      //   colorStops: [
      //     {
      //       offset: 0,
      //       color: "red",
      //     },
      //     {
      //       offset: 50,
      //       color: "yellow",
      //     },
      //     {
      //       offset: 100,
      //       color: "blue",
      //     },
      //   ],
      // },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
    grid: {
      show: true,
    },
    xaxis: {
      // type: "datetime",
      categories: ["8-8-2023", "8-9-2023", "8-10-2023"],
    },
    yaxis: [
      {
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
    ],
  },
};
