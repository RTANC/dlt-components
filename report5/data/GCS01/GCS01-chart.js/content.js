<script>
var chart = new ApexCharts(document.querySelector("#myChart1"),{
        title: {
            text: 'จำนวนรถรับส่งสินค้า (คัน)',
            align: 'center',
            margin: 30,
            style: {
              fontSize:  '28px',
              fontWeight:  'bold',
              fontFamily:  'THSarabunPSK',
              color:  '#263238'
            }
        },
        series: {{{toJSON TotalCars}}},
        chart: {
            width: 600,
            type: 'pie',
            fontFamily: 'THSarabunPSK',
            animations: {
                enabled: false
            },
             offsetY: 20
        },
        labels: ['ส่งสินค้า', 'รับสินค้า', 'รับและส่งสินค้า', 'อื่นๆ', 'รวม'],
        legend: {
            fontSize: '26px',
            fontFamily: 'THSarabunPSK',
            fontWeight:  'bold',
             offsetX: 40,
             offsetY: 100
        },
        dataLabels: {
            style: {
                fontSize: '23px',
                fontFamily: 'THSarabunPSK',
                fontWeight: 'bold',
            }
        }
    });
chart.render();

var chart2 = new ApexCharts(document.querySelector("#myChart2"),{
        title: {
            text: 'ปริมาณสินค้า (ตัน)',
            align: 'center',
            margin: 30,
            style: {
              fontSize:  '28px',
              fontWeight:  'bold',
              fontFamily:  'THSarabunPSK',
              color:  '#263238'
            }
        },
        series: {{{toJSON TotalWeights}}},
        chart: {
            width: 600,
            type: 'pie',
            fontFamily: 'THSarabunPSK',
            animations: {
                enabled: false
            },
             offsetY: 20
        },
        labels: ['ส่งสินค้า', 'รับสินค้า', 'รับและส่งสินค้า', 'อื่นๆ', 'รวม'],
        legend: {
            fontSize: '26px',
            fontFamily: 'THSarabunPSK',
            fontWeight:  'bold',
             offsetX: 40,
             offsetY: 100
        },
        dataLabels: {
            style: {
                fontSize: '23px',
                fontFamily: 'THSarabunPSK',
                fontWeight: 'bold',
            }
        }
    });
chart2.render(); 
</script>