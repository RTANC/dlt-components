<script>
var chart1 = new ApexCharts(document.querySelector("#chart1"), {
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        useSeriesColors: true
      }
    },
    series: {{{toJSON chart1series}}},
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
  categories: ["บริษัท บลู แอนด์ ไวท์ ดิสทริบิวเตอร์ จำกัด", "ห้างหุ้นส่วนจำกัด (ติ่ง) ขนส่งชลบุรี ", "บริษัท ชวาลกิตขนส่ง จำกัด", "บริษัท นิ่มซี่เส็งขนส่ง 1988 จำกัด", "บริษัท เอ็มเอส นอร์ธสตาร์ โลจิสติกส์ (ไทยแลนด์) จำกัด", "ห้างหุ้นส่วนจำกัด ป.กิติพงศ์ขนส่ง (2001)", "บริษัท พยัคฆ์ขนส่ง จำกัด", "ห้างหุ้นส่วนจำกัด ม่งเส็งบุรีรัมย์ขนส่ง", "ห้างหุ้นส่วนจำกัด ส. เพิ่มกิจขนส่ง", "ห้างหุ้นส่วนจำกัด ฮอเนต ขนส่ง", "บริษัท บลู แอนด์ ไวท์ โลจิสติกส์ จำกัด", "บริษัท สหะสัมพันธ์ทรานสปอร์ต จำกัด"],
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
  chart1.render();

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
  categories: ["บริษัท บลู แอนด์ ไวท์ ดิสทริบิวเตอร์ จำกัด", "ห้างหุ้นส่วนจำกัด (ติ่ง) ขนส่งชลบุรี ", "บริษัท ชวาลกิตขนส่ง จำกัด", "บริษัท นิ่มซี่เส็งขนส่ง 1988 จำกัด", "บริษัท เอ็มเอส นอร์ธสตาร์ โลจิสติกส์ (ไทยแลนด์) จำกัด", "ห้างหุ้นส่วนจำกัด ป.กิติพงศ์ขนส่ง (2001)", "บริษัท พยัคฆ์ขนส่ง จำกัด", "ห้างหุ้นส่วนจำกัด ม่งเส็งบุรีรัมย์ขนส่ง", "ห้างหุ้นส่วนจำกัด ส. เพิ่มกิจขนส่ง", "ห้างหุ้นส่วนจำกัด ฮอเนต ขนส่ง", "บริษัท บลู แอนด์ ไวท์ โลจิสติกส์ จำกัด", "บริษัท สหะสัมพันธ์ทรานสปอร์ต จำกัด"],
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
  chart2.render();
</script>