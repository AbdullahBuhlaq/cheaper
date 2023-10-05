export const usersGender = {
  title: "عدد المستخدمين",
  series: [],
  loading: true,
  options: {
    labels: ["ذكور", "إناث"],

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
              label: "الجنس",
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
