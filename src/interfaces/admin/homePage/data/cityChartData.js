export const cityChartData = {
  color: {
    backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
    boxShadow: "0px 10px 20px 0px #FDC0C7",
  },

  options: {
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: "Tajawal",
        foreColor: "red",
      },
    },
    series: [
      {
        name: "محل",
        data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35, 90],
      },
    ],

    chart: {
      foreColor: "gray",
      fontFamily: "Tajawal",
      height: "auto",
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        // borderRadiusApplication: "end",
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },

    xaxis: {
      labels: {
        rotate: -45,
      },
      categories: ["حمص", "دمشق", "حلب", "حمص", "دمشق", "حلب", "حمص", "دمشق", "حلب", "حمص", "دمشق", "حلب"],
      tickPlacement: "on",
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

    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  },

  loading: true,
};
