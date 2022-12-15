<script>
var chart1 = new ApexCharts(document.querySelector("#chart1"), {
    series: [{
    name: 'จำนวนรถที่เข้า-ออกสถานี (คัน)',
    data: {{{getData reportData}}}
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
            return val.toFixed(2);
          },
  offsetY: -20,
  style: {
      fontSize: '10px',
      fontFamily: 'THSarabunPSK',
      fontWeight: 'bold',
      colors: ["#304758"]
    }
        },

  xaxis: {
    labels: {
      rotate: -90,
      style: {
        fontSize:  '8px',
        fontWeight:  'bold',
        fontFamily:  'THSarabunPSK',
        color:  '#263238'
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
    text: 'เวลาเฉลี่ย (ชม.นาที)',
          }        
        },
  title: {
    text: 'ระยะเวลาเฉลี่ยที่รถแต่ละคันใช้เวลาอยู่ในสถานี  แยกตามผู้ประกอบการ',
  floating: false,
  offsetY: 0,
  align: 'center',
  style: {
    color: '#444'
          }
        }
        });
  chart1.render();
</script>