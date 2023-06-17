<script>
var chart1 = new ApexCharts(document.querySelector("#chart1"), {
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        useSeriesColors: true
      },
      fontSize: '26px',
      fontFamily: 'THSarabunPSK',
      fontWeight:  'bold'
    },
    series: {{{getDataChart1 reportData}}},
    chart: {
    width: 1000,
  height: 450,
  type: 'bar',
  animations: {enabled: false },
  fontFamily: 'THSarabunPSK'
        },
  plotOptions: {
    bar: {
    dataLabels: {
    position: 'top', // top, center, bottom
            },
          }
        },
  dataLabels: {
    enabled: true,
  formatter: function (val) {
            return val.toLocaleString('en-US');
          },
  offsetY: -30,
  style: {
        fontSize: '16px',
        fontFamily: 'THSarabunPSK',
        fontWeight: 'bold',
        colors: ["#304758"]
      }
        },

  xaxis: {
    labels: {
    rotate: -45,
    style: {
        fontSize: '18px',
        fontFamily: 'THSarabunPSK',
        fontWeight: 'bold',
        colors: '#263238'
      }
          },
  categories: {{{getCategories reportData}}},
  axisBorder: {
    show: false
          },
  axisTicks: {
    show: false
          },
  crosshairs: {
    fill: {
    type: 'gradient',
  gradient: {
    colorFrom: '#D8E3F0',
  colorTo: '#BED1E6',
  stops: [0, 100],
  opacityFrom: 0.4,
  opacityTo: 0.5,
              }
            }
          },
  tooltip: {
    enabled: true,
          },
  title: {
    text: 'ผู้ประกอบการ',
    offsetY: 200,
    style: {
        fontSize: '20px',
        fontFamily: 'THSarabunPSK',
        fontWeight: 'bold',
        colors: '#263238'
      }
          }
        },
  yaxis: {
    axisBorder: {
    show: true
          },
  axisTicks: {
    show: true,
          },
  labels: {
    show: true,
  formatter: function (val) {
              return val.toLocaleString('en-US');
            },
          style: {
          fontSize:  '18px',
          fontWeight:  'bold',
          fontFamily:  'THSarabunPSK',
          color:  '#263238'
        }
          },
  title: {
    text: 'จำนวนรถ (คัน)',
    style: {
        fontSize: '20px',
        fontFamily: 'THSarabunPSK',
        fontWeight: 'bold',
        colors: '#263238'
      }
          }        
        },
  title: {
    text: 'จำนวนรถรับส่งสินค้า (คัน)',
  floating: false,
  offsetY: 0,
  align: 'center',
  style: {
        fontSize: '20px',
        fontFamily: 'THSarabunPSK',
        fontWeight: 'bold',
        colors: '#263238'
      }
        }
        });
  chart1.render();

    var chart2 = new ApexCharts(document.querySelector("#chart2"), {
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        useSeriesColors: true
      },
      fontSize: '26px',
      fontFamily: 'THSarabunPSK',
      fontWeight:  'bold'
    },
    series: {{{getDataChart2 reportData}}},
    chart: {
    width: 1000,
  height: 450,
  type: 'bar',
  animations: {enabled: false },
  fontFamily: 'THSarabunPSK'
        },
  plotOptions: {
    bar: {
    dataLabels: {
    position: 'top', // top, center, bottom
            },
          }
        },
  dataLabels: {
    enabled: true,
  formatter: function (val) {
            return val.toLocaleString('en-US');
          },
  offsetY: -30,
  style: {
    fontSize: '16px',
  colors: ["#304758"]
          }
        },
  xaxis: {
    labels: {
    rotate: -45,
    style: {
      fontSize: '16px',
  colors: '#263238'
    }
          },
  categories: {{{getCategories reportData}}},
  axisBorder: {
    show: false
          },
  axisTicks: {
    show: false
          },
  crosshairs: {
    fill: {
    type: 'gradient',
  gradient: {
    colorFrom: '#D8E3F0',
  colorTo: '#BED1E6',
  stops: [0, 100],
  opacityFrom: 0.4,
  opacityTo: 0.5,
              }
            }
          },
  tooltip: {
    enabled: true,
          },
  title: {
    text: 'ผู้ประกอบการ',
    offsetY: 220,
    style: {
      fontSize: '18px',
  colors: ["#304758"]
    }
          }
        },
  yaxis: {
    axisBorder: {
    show: true
          },
  axisTicks: {
    show: true,
          },
  labels: {
    show: true,
  formatter: function (val) {
              return val.toLocaleString('en-US');
            },
            style: {
      fontSize: '16px',
  colors: ["#304758"]
    }
          },
  title: {
    text: 'ปริมาณสินค้า (ตัน)',
    style: {
      fontSize: '18px',
  colors: ["#304758"]
    }
          }        
        },
  title: {
    text: 'ปริมาณสินค้ารับส่ง (ตัน)',
  floating: false,
  offsetY: 0,
  align: 'center',
  style: {
      fontSize: '18px',
  colors: ["#304758"]
    }
        }
        });
  chart2.render();
</script>