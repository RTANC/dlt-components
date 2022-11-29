<script>
var chart = new ApexCharts(document.querySelector("#myChart1"),{
        title: {
            text: 'จำนวนรถรับส่งสินค้า (คัน)',
            align: 'center',
            margin: 10
        },
        series: {{{toJSON TotalCars}}},
        chart: {
            width: 500,
            type: 'pie',
            animations: {
                enabled: false
            }
        },
        labels: ['ส่งสินค้า', 'รับสินค้า', 'รับและส่งสินค้า', 'อื่นๆ', 'รวม']
    });
chart.render();

var chart2 = new ApexCharts(document.querySelector("#myChart2"),{
        title: {
            text: 'ปริมาณสินค้า (ตัน)',
            align: 'center',
            margin: 10
        },
        series: {{{toJSON TotalWeights}}},
        chart: {
            width: 500,
            type: 'pie',
            animations: {
                enabled: false
            }
        },
        labels: ['ส่งสินค้า', 'รับสินค้า', 'รับและส่งสินค้า', 'อื่นๆ', 'รวม']
    });
chart2.render(); 
</script>