export const usersAges = {
  title: "عدد المستخدمين",

  series: [],
  loading: true,
  options: {
    labels: ["تحت 18", "18 - 30", "31 - 60", "فوق 60"],

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
              label: "العمر",
              formatter: () => "",
            },
          },
        },
      },
    },

    fill: {
      type: "gradient",
    },

    legend: {
      position: "bottom",
    },
  },
};
