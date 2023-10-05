export const usersBlocked = {
  title: "عدد المستخدمين",
  series: [10],
  loading: true,
  options: {
    chart: {
      foreColor: "gray",

      fontFamily: "Tajawal",
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          labels: {
            show: true,

            total: {
              show: true,
              label: "المحظورين",
              formatter: () => "",
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "";
        },
      },
    },
    labels: ["المحظورين"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },

    legend: {
      position: "bottom",
    },
  },
};
