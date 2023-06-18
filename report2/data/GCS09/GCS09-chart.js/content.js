<script>
  const legendStyle = {
    fontSize: '26px',
    fontFamily: 'THSarabunPSK',
    fontWeight:  'bold'
  }

  const dataLabelStyle = {
      fontSize: '16px',
      fontWeight: 'bold',
      colors: ["#304758"]
  }

  const xyLabelStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: "#263238"
  }

  const xyTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#263238'
  }

  const titleStyle = {
    fontSize: '20px',
    fontFamily: 'THSarabunPSK',
    fontWeight: 'bold',
    colors: '#263238'
  }

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
      style: dataLabelStyle
    },
    xaxis: {
      labels: {
        rotate: -45,
        style: xyLabelStyle
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
        text: 'ช่วงเวลา',
        offsetY: 100,
        style: xyTitleStyle
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
        style: xyLabelStyle
      },
      title: {
        text: 'จำนวนรถ (คัน)',
        style: xyTitleStyle
      }        
    },
    title: {
      text: 'จำนวนรถที่เข้า-ออกสถานี (คัน)',
      floating: false,
      offsetY: 0,
      align: 'center',
      style: titleStyle
    }
  });
  chart1.render();


  var chart2 = new ApexCharts(document.querySelector("#chart2"), {
    series: [{
      name: 'จำนวนรถบรรทุกที่เข้า-ออกสถานี (คัน)',
      data: {{{getData2 reportData}}}
    }],
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
      style: dataLabelStyle
    },
    xaxis: {
      labels: {
        rotate: -45,
        style: xyLabelStyle
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
        text: 'ช่วงเวลา',
        offsetY: 100,
        style: xyTitleStyle
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
        style: xyLabelStyle
      },
      title: {
        text: 'จำนวนรถ (คัน)',
        style: xyTitleStyle
      }        
    },
    title: {
      text: 'จำนวนรถบรรทุกที่เข้า-ออกสถานี (คัน)',
      floating: false,
      offsetY: 0,
      align: 'center',
      style: titleStyle
    }
  });
  chart2.render();

  var chart3 = new ApexCharts(document.querySelector("#chart3"), {
    series: [{
      name: 'ปริมาณการขนถ่ายสินค้าทั้งหมดผ่านสถานี (ตัน)',
      data: {{{getData3 reportData}}}
    }],
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
      style: dataLabelStyle
    },
    xaxis: {
      labels: {
        rotate: -45,
        style: xyLabelStyle
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
        text: 'ช่วงเวลา',
        offsetY: 100,
        style: xyTitleStyle
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
        style: xyLabelStyle
      },
      title: {
        text: 'น้ำหนักรถบรรทุก (ตัน)',
        style: xyTitleStyle
      }
    },
    title: {
      text: 'ปริมาณการขนถ่ายสินค้าทั้งหมดผ่านสถานี (ตัน)',
      floating: false,
      offsetY: 0,
      align: 'center',
      style: titleStyle
    }
  });
  chart3.render();

  var chart4 = new ApexCharts(document.querySelector("#chart4"), {
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        useSeriesColors: true
      },
      fontSize: legendStyle.fontSize,
      fontFamily: legendStyle.fontFamily,
      fontWeight:  legendStyle.fontWeight
    },
    series: {{{getData4 reportData}}},
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
      style: dataLabelStyle
    },
    xaxis: {
      labels: {
        rotate: -45,
        style: xyLabelStyle
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
        text: 'ช่วงเวลา',
        offsetY: 100,
        style: xyTitleStyle
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
        style: xyTitleStyle
      }        
    },
    title: {
      text: 'จำนวนรถรับส่งสินค้า (คัน)',
      floating: false,
      offsetY: 0,
      align: 'center',
      style: titleStyle
    }
  });
  chart4.render();

  var chart5 = new ApexCharts(document.querySelector("#chart5"), {
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        useSeriesColors: true
      },
      fontSize: legendStyle.fontSize,
      fontFamily: legendStyle.fontFamily,
      fontWeight:  legendStyle.fontWeight
    },
    series: {{{getData5 reportData}}},
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
        return Math.round(val).toLocaleString('en-US');
      },
      offsetY: -30,
      style: dataLabelStyle
    },
    xaxis: {
      labels: {
        rotate: -45,
        style: xyLabelStyle
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
        text: 'ช่วงเวลา',
        offsetY: 100,
        style: xyTitleStyle
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
        style: xyLabelStyle
      },
      title: {
        text: 'ปริมาณสินค้า (ตัน)',
        style: xyTitleStyle
      }
    },
    title: {
      text: 'ปริมาณสินค้ารับส่ง (ตัน)',
      floating: false,
      offsetY: 0,
      align: 'center',
      style: titleStyle
    }
  });
  chart5.render();
</script>