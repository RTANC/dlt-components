<script>
  var chart = new ApexCharts(document.querySelector("#chart1"), {
    series: [{
    name: 'ปริมาณการขนถ่ายสินค้าทั้งหมดผ่านสถานี',
    data: {{{toJSON ddata}}}
    }],
    chart: {
    width: 1000,
  height: 450,
  type: 'bar',
  animations: {enabled: false },
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
  offsetY: -20,
  style: {
    fontSize: '12px',
  colors: ["#304758"]
          }
        },

  xaxis: {
    labels: {
    rotate: -45
          },
  categories: ["รถบรรทุก 4 ล้อ", "รถบรรทุก 6 ล้อ", "รถบรรทุก 10 ล้อ", "รถบรรทุก 12 ล้อ", "รถกึ่งพ่วง 14 ล้อ", "รถกึ่งพ่วง 18 ล้อ", "รถกึ่งพ่วง 20 ล้อ", "รถกึ่งพ่วง มากกว่า 20 ล้อ", "รถพ่วง 14 ล้อ", "รถพ่วง 18 ล้อ", "รถพ่วง 20 ล้อ", "รถพ่วง มากกว่า 20 ล้อ"],
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
    text: 'ประเภทรถ',
    offsetY: 220
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
            }
          },
  title: {
    text: 'น้ำหนักรถบรรทุก (ตัน)',
          }        
        },
  title: {
    text: 'ปริมาณการขนถ่ายสินค้าทั้งหมดผ่านสถานี (ตัน)',
  floating: false,
  offsetY: 0,
  align: 'center',
  style: {
    color: '#444'
          }
        }
        });
  chart.render();

  var chart2 = new ApexCharts(document.querySelector("#chart2"), {
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        useSeriesColors: true
      }
    },
    series: {{{toJSON chart2series}}},
    chart: {
    width: 1000,
  height: 450,
  type: 'bar',
  animations: {enabled: false },
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
  offsetY: -20,
  style: {
    fontSize: '12px',
  colors: ["#304758"]
          }
        },

  xaxis: {
    labels: {
    rotate: -45
          },
  categories: ["รถบรรทุก 4 ล้อ", "รถบรรทุก 6 ล้อ", "รถบรรทุก 10 ล้อ", "รถบรรทุก 12 ล้อ", "รถกึ่งพ่วง 14 ล้อ", "รถกึ่งพ่วง 18 ล้อ", "รถกึ่งพ่วง 20 ล้อ", "รถกึ่งพ่วง มากกว่า 20 ล้อ", "รถพ่วง 14 ล้อ", "รถพ่วง 18 ล้อ", "รถพ่วง 20 ล้อ", "รถพ่วง มากกว่า 20 ล้อ"],
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
    text: 'ประเภทรถ',
    offsetY: 220
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
            }
          },
  title: {
    text: 'จำนวนรถ (คัน)',
          }        
        },
  title: {
    text: 'จำนวนรถรับส่งสินค้า (คัน)',
  floating: false,
  offsetY: 0,
  align: 'center',
  style: {
    color: '#444'
          }
        }
        });
  chart2.render();

  var chart3 = new ApexCharts(document.querySelector("#chart3"), {
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        useSeriesColors: true
      }
    },
    series: {{{toJSON chart3series}}},
    chart: {
    width: 1000,
  height: 450,
  type: 'bar',
  animations: {enabled: false },
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
  offsetY: -20,
  style: {
    fontSize: '12px',
  colors: ["#304758"]
          }
        },

  xaxis: {
    labels: {
    rotate: -45
          },
  categories: ["รถบรรทุก 4 ล้อ", "รถบรรทุก 6 ล้อ", "รถบรรทุก 10 ล้อ", "รถบรรทุก 12 ล้อ", "รถกึ่งพ่วง 14 ล้อ", "รถกึ่งพ่วง 18 ล้อ", "รถกึ่งพ่วง 20 ล้อ", "รถกึ่งพ่วง มากกว่า 20 ล้อ", "รถพ่วง 14 ล้อ", "รถพ่วง 18 ล้อ", "รถพ่วง 20 ล้อ", "รถพ่วง มากกว่า 20 ล้อ"],
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
    text: 'ประเภทรถ',
    offsetY: 220
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
            }
          },
  title: {
    text: 'ปริมาณสินค้า (ตัน)',
          }        
        },
  title: {
    text: 'ปริมาณสินค้ารับส่ง (ตัน)',
  floating: false,
  offsetY: 0,
  align: 'center',
  style: {
    color: '#444'
          }
        }
        });
  chart3.render();

</script>