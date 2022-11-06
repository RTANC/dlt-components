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
            return val.toFixed(2);
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
    text: 'เวลาเฉลี่ย (ชม.นาที)',
          }        
        },
  title: {
    text: 'ระยะเวลาเฉลี่ยที่รถแต่ละคันใช้เวลาอยู่ในสถานี  แยกตามประเภทรถ',
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