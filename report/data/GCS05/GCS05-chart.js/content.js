<script>
var chart1 = new ApexCharts(document.querySelector("#chart1"), {
    series: [{
    name: 'จำนวนรถที่เข้า-ออกสถานี (คัน)',
    data: {{{toJSON ddata1}}}
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
  categories: ["01:", "03:", "04:", "05:", "06:","07:","08:","09:","10:","11:","12:","13:"],
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
    text: 'ชั่วโมงที่',
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
    text: 'จำนวนรถที่เข้า-ออกสถานี (คัน)',
  floating: false,
  offsetY: 0,
  align: 'center',
  style: {
    color: '#444'
          }
        }
        });
  chart1.render();


  var chart2 = new ApexCharts(document.querySelector("#chart2"), {
    series: [{
    name: 'จำนวนรถบรรทุกที่เข้า-ออกสถานี (คัน)',
    data: {{{toJSON ddata1}}}
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
  categories: ["01:", "03:", "04:", "05:", "06:","07:","08:","09:","10:","11:","12:","13:"],
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
    text: 'ชั่วโมงที่',
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
    text: 'จำนวนรถที่เข้า-ออกสถานี (คัน)',
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
    series: [{
    name: 'ปริมาณการขนถ่ายสินค้าทั้งหมดผ่านสถานี (ตัน)',
    data: {{{toJSON ddata1}}}
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
  categories: ["01:", "03:", "04:", "05:", "06:","07:","08:","09:","10:","11:","12:","13:"],
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
    text: 'ชั่วโมงที่',
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
  chart3.render();

  var chart4 = new ApexCharts(document.querySelector("#chart4"), {
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        useSeriesColors: true
      }
    },
    series: {{{toJSON chart4series}}},
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
  categories: ["01:", "03:", "04:", "05:", "06:","07:","08:","09:","10:","11:","12:","13:"],
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
    text: 'ชั่วโมงที่',
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
  chart4.render();

    var chart5 = new ApexCharts(document.querySelector("#chart5"), {
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        useSeriesColors: true
      }
    },
    series: {{{toJSON chart4series}}},
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
  categories: ["01:", "03:", "04:", "05:", "06:","07:","08:","09:","10:","11:","12:","13:"],
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
    text: 'ชั่วโมงที่',
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
  chart5.render();
</script>