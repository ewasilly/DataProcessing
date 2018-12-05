// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot

window.onload = function() {
  console.log('Yes, you can!');

  // retrieve data with API
  var msti = "https://raw.githubusercontent.com/ewasilly/DataProcessing/master/Homework/Week_5/msti.json";
  var consconf = "https://raw.githubusercontent.com/ewasilly/DataProcessing/master/Homework/Week_5/consconf.json";

  var requests = [d3.json(consconf), d3.json(msti)];
  var cc_countries = [];
  var cc_years = [];
  var countries_scatter = [];
  var different_years = [];

  Promise.all(requests).then(function(response) {
    console.log(response);
    // make a list of the countries that are in the consumer confidence dataset
    for (i = 0; i < response[1].length; i++) {
      if (cc_countries.includes(response[1][i]['Country']) == false) {
        cc_countries.push(response[1][i]['Country']);
      }
      // save the years of the data in consumer confidence dataset
      if (cc_years.includes(response[1][i]['time']) == false) {
        cc_years.push(parseInt(response[1][i]['time']));
      }
    }

    console.log(cc_years);

    var msti_fr = [];
    var msti_deu = [];
    var msti_kor = [];
    var msti_nl = [];
    var msti_por = [];
    var msti_uk = [];
    var dataFRmsti = [];
    var dataDEUmsti = [];
    var dataKORmsti = [];
    var dataNLmsti = [];
    var dataPORmsti = [];
    var dataUKmsti = [];
    var dataFRcc = [];
    var dataNLcc = [];
    var dataPORcc = [];
    var dataDEUcc = [];
    var dataUKcc = [];
    var dataKORcc = [];

    var dataFRmsti2007;
    var dataFRmsti2015;
    var dataDEUmsti2007;
    var dataDEUmsti2015;
    var dataKORmsti2007;
    var dataKORmsti2015;
    var dataNLmsti2007;
    var dataNLmsti2015;
    var dataPORmsti2007;
    var dataPORmsti2015;
    var dataUKmsti2007;
    var dataUKmsti2015;

    var dataFRcc2007;
    var dataFRcc2015;
    var dataDEUcc2007;
    var dataDEUcc2015;
    var dataKORcc2007;
    var dataKORcc2015;
    var dataNLcc2007;
    var dataNLcc2015;
    var dataPORcc2007;
    var dataPORcc2015;
    var dataUKcc2007;
    var dataUKcc2015;

    // determine which countries belong to msti dataset
    // (info for this retrieved from API)
    for (i = 0; i < 9; i++) {
      msti_fr.push(response[1][i]);
    }

    for (i = 9; i < 14; i++) {
      msti_deu.push(response[1][i]);
    }

    for (i = 14; i < 23; i++){
      msti_kor.push(response[1][i]);
    }

    for (i = 23; i < 30; i++) {
      msti_nl.push(response[1][i]);
    }

    for (i = 30; i < 39; i++) {
      msti_por.push(response[1][i]);
    }

    for (i = 39; i < response[1].length; i++) {
      msti_uk.push(response[1][i]);
    }


    // isolate the years and datapoints of France
    for (i = 0; i < msti_fr.length; i++) {
      dataFRmsti.push([msti_fr[i]['time'],
      msti_fr[i]['datapoint']]);
    }

    console.log(dataFRmsti);
    // calculate the mean datapoint value of France for msti dataset
    total_FRmsti = 0;
    for (i = 0; i < dataFRmsti.length; i++) {
      total_FRmsti = total_FRmsti + dataFRmsti[i][1];
      if (dataFRmsti[i][0] == "2007") {
          // round off to 2 decimals
        dataFRmsti2007 = Number(parseFloat(dataFRmsti[i][1]).toFixed(2));
      }
      else if (dataFRmsti[i][0] == "2015") {
          // round off to 2 decimals
        dataFRmsti2015 =  Number(parseFloat(dataFRmsti[i][1]).toFixed(2));
      }
    }
    // round off to 2 decimals
    mean_FRmsti = total_FRmsti / dataFRmsti.length;
    mean_FRmsti = parseFloat(mean_FRmsti).toFixed(2);
    mean_FRmsti = Number(mean_FRmsti);


    for (i = 0; i < msti_deu.length; i++) {
      dataDEUmsti.push([msti_deu[i]['time'],
      msti_deu[i]['datapoint']]);
    }
    // calculate the mean datapoint value of Germany for msti dataset
    total_DEUmsti = 0;
    for (i = 0; i < dataDEUmsti.length; i++) {
      total_DEUmsti = total_DEUmsti + dataDEUmsti[i][1];
      if (dataDEUmsti[i][0] == "2007") {
        dataDEUmsti2007 = Number(parseFloat(dataDEUmsti[i][1]).toFixed(2));
      }
      else if (dataDEUmsti[i][0] == "2015") {
        dataDEUmsti2015 = Number(parseFloat(dataDEUmsti[i][1]).toFixed(2));
      }
    }
    mean_DEUmsti = total_DEUmsti / dataDEUmsti.length;
    mean_DEUmsti = parseFloat(mean_DEUmsti).toFixed(2);
    mean_DEUmsti = Number(mean_DEUmsti);

    for (i = 0; i < msti_kor.length; i++) {
      dataKORmsti.push([msti_kor[i]['time'],
      msti_kor[i]['datapoint']]);
    }
    // calculate the mean datapoint value of Korea for msti dataset
    total_KORmsti = 0;
    for (i = 0; i < dataKORmsti.length; i++) {
      total_KORmsti = total_KORmsti + dataKORmsti[i][1];
      if (dataKORmsti[i][0] == "2007") {
        dataKORmsti2007 = Number(parseFloat(dataKORmsti[i][1]).toFixed(2));
      }
      else if (dataKORmsti[i][0] == "2015") {
        dataKORmsti2015 = Number(parseFloat(dataKORmsti[i][1]).toFixed(2));
      }
    }
    mean_KORmsti = total_KORmsti / dataKORmsti.length;
    mean_KORmsti = parseFloat(mean_KORmsti).toFixed(2);
    mean_KORmsti = Number(mean_KORmsti);

    for (i = 0; i < msti_nl.length; i++) {
      dataNLmsti.push([msti_nl[i]['time'],
      msti_nl[i]['datapoint']]);
    }
    // calculate the mean datapoint value of Korea for msti dataset
    total_NLmsti = 0;
    for (i = 0; i < dataNLmsti.length; i++) {
      total_NLmsti = total_NLmsti + dataNLmsti[i][1];
      if (dataNLmsti[i][0] == "2007") {
        dataNLmsti2007 = Number(parseFloat(dataNLmsti[i][1]).toFixed(2));
      }
      else if (dataNLmsti[i][0] == "2015") {
        dataNLmsti2015 = Number(parseFloat(dataNLmsti[i][1]).toFixed(2));
      }
    }
    mean_NLmsti = total_NLmsti / dataNLmsti.length;
    mean_NLmsti = parseFloat(mean_NLmsti).toFixed(2);
    mean_NLmsti = Number(mean_NLmsti);

    for (i = 0; i < msti_por.length; i++) {
      dataPORmsti.push([msti_por[i]['time'],
      msti_por[i]['datapoint']]);
    }
    // calculate the mean datapoint value of Korea for msti dataset
    total_PORmsti = 0;
    for (i = 0; i < dataPORmsti.length; i++) {
      total_PORmsti = total_PORmsti + dataPORmsti[i][1];
      if (dataPORmsti[i][0] == "2007") {
        // round off to 2 decimals
        dataPORmsti2007 = Number(parseFloat(dataPORmsti[i][1]).toFixed(2));
      }
      else if (dataPORmsti[i][0] == "2015") {
        dataPORmsti2015 = Number(parseFloat(dataPORmsti[i][1]).toFixed(2));
      }
    }
    // round off to 2 decimals
    mean_PORmsti = total_PORmsti / dataPORmsti.length;
    mean_PORmsti = parseFloat(mean_PORmsti).toFixed(2);
    mean_PORmsti = Number(mean_PORmsti);

    for (i = 0; i < msti_uk.length; i++) {
      dataUKmsti.push([msti_uk[i]['time'],
      msti_uk[i]['datapoint']]);
    }
    // calculate the mean datapoint value of Korea for msti dataset
    total_UKmsti = 0;
    for (i = 0; i < dataUKmsti.length; i++) {
      total_UKmsti = total_UKmsti + dataUKmsti[i][1];
      if (dataUKmsti[i][0] == "2007") {
          // round off to 2 decimals
        dataUKmsti2007 = Number(parseFloat(dataUKmsti[i][1]).toFixed(2));
      }
      else if (dataUKmsti[i][0] == "2015") {
          // round off to 2 decimals
        dataUKmsti2015 = Number(parseFloat(dataUKmsti[i][1]).toFixed(2));
      }
    }
    // round off to 2 decimals
    mean_UKmsti = total_UKmsti / dataUKmsti.length;
    mean_UKmsti = parseFloat(mean_UKmsti).toFixed(2);
    mean_UKmsti = Number(mean_UKmsti);

    // isolate the datapoint and the year that belongs to it from
    for (i = 0; i < response[0].length; i++) {
      if (response[0][i]['Country'] == "France") {
        dataFRcc.push([parseInt(response[0][i]['time']),
        response[0][i]['datapoint']]);
      }
    }

    // isolate the datapoint and the year that belongs to it from NL
    for (i = 0; i < response[0].length; i++) {
      if (response[0][i]['Country'] == "Netherlands") {
        dataNLcc.push([parseInt(response[0][i]['time']),
        response[0][i]['datapoint']]);
      }
    }

    // isolate the datapoint and the year that belongs to it from Portugal
    for (i = 0; i < response[0].length; i++) {
      if (response[0][i]['Country'] == "Portugal") {
        dataPORcc.push([parseInt(response[0][i]['time']),
        response[0][i]['datapoint']]);
      }
    }

    // isolate the datapoint and the year that belongs to it from Germany
    for (i = 0; i < response[0].length; i++) {
      if (response[0][i]['Country'] == "Germany") {
        dataDEUcc.push([parseInt(response[0][i]['time']),
        response[0][i]['datapoint']]);
      }
    }

    // isolate the datapoint and the year that belongs to it from UK
    for (i = 0; i < response[0].length; i++) {
      if (response[0][i]['Country'] == "United Kingdom") {
        dataUKcc.push([parseInt(response[0][i]['time']),
        response[0][i]['datapoint']]);
      }
    }

    // isolate the datapoint and the year that belongs to it from Korea
    for (i = 0; i < response[0].length; i++) {
      if (response[0][i]['Country'] == "Korea") {
        dataKORcc.push([parseInt(response[0][i]['time']),
        response[0][i]['datapoint'], 1]);
      }
    }

    // calculate the mean data value of  for consumer confidence
    // years 2007 - 2015
    total_FRcc = 0;
    for (i = 0; i < dataFRcc.length; i++) {
      total_FRcc = total_FRcc + dataFRcc[i][1];
      if (dataFRcc[i][0] == 2007) {
        dataFRcc2007 = dataFRcc[i][1];
      }
      else if (dataFRcc[i][0] == 2015) {
        dataFRcc2015 = dataFRcc[i][1];
      }
    }
    mean_FRcc = (total_FRcc / dataFRcc.length);
    mean_FRcc = parseFloat(mean_FRcc).toFixed(2);
    mean_FRcc = Number(mean_FRcc);

    // calculate the mean data value of NL for consumer confidence
    // years 2007 - 2015
    total_NLcc = 0;
    for (i = 0; i < dataNLcc.length; i++) {
      total_NLcc = total_NLcc + dataNLcc[i][1];
      if (dataNLcc[i][0] == 2007) {
        dataNLcc2007 = dataNLcc[i][1];
      }
      else if (dataNLcc[i][0] == 2015) {
        dataNLcc2015 = dataNLcc[i][1];
      }
    }
    mean_NLcc = total_NLcc / dataNLcc.length;
    mean_NLcc = parseFloat(mean_NLcc).toFixed(2);
    mean_NLcc = Number(mean_NLcc);


    // calculate the mean data value of Portugal for consumer confidence
    // years 2007 - 2015
    total_PORcc = 0;
    for (i = 0; i < dataPORcc.length; i++) {
      total_PORcc = total_PORcc + dataPORcc[i][1];
      if (dataPORcc[i][0] == 2007) {
        dataPORcc2007 = dataPORcc[i][1];
      }
      else if (dataPORcc[i][0] == 2015) {
        dataPORcc2015 = dataPORcc[i][1];
      }
    }
    mean_PORcc = total_PORcc / dataPORcc.length;
    mean_PORcc = parseFloat(mean_PORcc).toFixed(2);
    mean_PORcc = Number(mean_PORcc);
    // calculate the mean data value of  for consumer confidence
    // years 2007 - 2015
    total_DEUcc = 0;
    for (i = 0; i < dataDEUcc.length; i++) {
      total_DEUcc = total_DEUcc + dataDEUcc[i][1];
      if (dataDEUcc[i][0] == 2007) {
        dataDEUcc2007 = dataDEUcc[i][1];
      }
      else if (dataDEUcc[i][0] == 2015) {
        dataDEUcc2015 = dataDEUcc[i][1];
      }
    }
    mean_DEUcc = total_FRcc / dataFRcc.length;
    mean_DEUcc = parseFloat(mean_DEUcc).toFixed(2);
    mean_DEUcc = Number(mean_DEUcc);

    // calculate the mean data value of UK for consumer confidence
    // years 2007 - 2015
    total_UKcc = 0;
    for (i = 0; i < dataUKcc.length; i++) {
      total_UKcc = total_UKcc + dataUKcc[i][1];
      if (dataUKcc[i][0] == 2007) {
        dataUKcc2007 = dataUKcc[i][1];
      }
      else if (dataUKcc[i][0] == 2015) {
        dataUKcc2015 = dataUKcc[i][1];
      }
    }
    mean_UKcc = total_UKcc / dataUKcc.length;
    mean_UKcc = parseFloat(mean_UKcc).toFixed(2);
    mean_UKcc = Number(mean_UKcc);


    // calculate the mean data value of Korea for consumer confidence
    // years 2007 - 2015
    total_KORcc = 0;
    for (i = 0; i < dataKORcc.length; i++) {
      total_KORcc = total_KORcc + dataKORcc[i][1];
    }
    mean_KORcc = total_KORcc / dataKORcc.length;
    mean_KORcc = parseFloat(mean_KORcc).toFixed(2);
    mean_KORcc = Number(mean_KORcc);

    // get datapoints for years 2007-2015
    // 0 = Europe
    // 1 = Asia
    var dataset1 = [[mean_FRcc, mean_FRmsti, 0], [mean_NLcc, mean_NLmsti,
    0], [mean_PORcc, mean_PORmsti, 0], [mean_DEUcc, mean_DEUmsti,
    0], [mean_UKcc, mean_UKmsti, 0], [mean_KORcc, mean_KORmsti,
    1]];

    // remove datapoints with undefined values
    for (i = 0; i < dataset1.length; i++) {
      if (dataset1[i][0] == null) {
        dataset1.splice(i, 1);
      }
      else if (dataset1[i][1] == null) {
        dataset1.splice(i, 1);
      }
    }

    // get datapoints for year 2007
    // 0 = Europe
    // 1 = Asia
    var dataset2007 = [[dataFRcc2007, dataFRmsti2007, 0],
    [dataNLcc2007, dataNLmsti2007, 0], [dataPORcc2007, dataPORmsti2007,
    0], [dataDEUcc2007, dataDEUmsti2007, 0], [dataUKcc2007,
    dataUKmsti2007, 0], [dataKORcc2007, dataKORmsti2007, 1]];

    // remove datapoints with undefined values
    // 0 = Europe
    // 1 = Asia
    for (i = 0; i < dataset2007.length; i++) {
      if (dataset2007[i][0] == null) {
        dataset2007.splice(i, 1);
      }
      else if (dataset2007[i][1] == null) {
        dataset2007.splice(i, 1);
      }
    }

    // get datapoints for year 2015
    var dataset2015 = [[dataFRcc2015, dataFRmsti2015, 0], [dataNLcc2015,
    dataNLmsti2015, 0], [dataPORcc2015, dataPORmsti2015, 0],
    [dataDEUcc2015, dataDEUmsti2015, 0], [dataUKcc2015, dataUKmsti2015,
    0], [dataKORcc2015, dataKORmsti2015, 1]];

    // remove datapoints with undefined values
    for (i = 0; i < dataset2015.length; i++) {
      if (dataset2015[i][0] == null) {
        dataset2015.splice(i, 1);
      }
      else if (dataset2015[i][1] == null) {
        dataset2015.splice(i, 1);
      }
    }

    console.log(dataset1);
    console.log(dataset2007);
    console.log(dataset2015);

    var dataIndex = 1;

    var margin = {top: 30, right: 30, bottom: 50, left: 70},
    w = 600 - margin.left - margin.right,
    h = 400 - margin.top - margin.bottom;

    // create SVG element
    var svg = d3.select("body")
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin. bottom);



    function make_scatter(dataIndex) {
      // remove all existing circles
      svg.selectAll("circle").remove();

      // remove all existing 'text' coordinates
      svg.selectAll("text").remove();

      // remove existing x-axis and y-axis
      svg.selectAll("g").remove();

      var xScale = d3.scaleLinear()
          .domain([d3.min(eval("dataset" + dataIndex), function(d) {
            return d[0];
          }), d3.max(eval("dataset" + dataIndex), function(d) {
            return d[0];
          })])
          .range([margin.left, w]);

      var yScale = d3.scaleLinear()
          .domain([d3.min(eval("dataset" + dataIndex), function(d){
            return d[1];
          }), d3.max(eval("dataset" + dataIndex), function(d){
            return d[1];
          })])
          .range([h, margin.bottom]);


      // add new circles
      svg.selectAll("circle")
        .data(eval("dataset" + dataIndex))
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return xScale(d[0]);
        })
        .attr("cy", function(d) {
          return yScale(d[1]);
        })
        .attr("r", function(d) {
          return (d[0]+d[1])/20;
        })
        // COLOR
        .style("fill", function(d) {
          return d[2].color;
        });


      // add new coordinates to every datapoint in the scatterplot (in red)
      svg.selectAll("text")
       .data(eval("dataset" + dataIndex))
       .enter()
       .append("text")
       .text(function(d) {
         return d[0] + "," + d[1];
       })
       .attr("x", function(d) {
         return xScale(d[0]);
       })
       .attr("y", function(d) {
        return yScale(d[1]);
       })
       .attr("font-family", "sans-serif")
       .attr("font-size", "11px")
       .attr("fill", "red");


       // add the x-axis
       svg.append("g")
         .attr("transform", "translate(0," + h + ")")
         .call(d3.axisBottom(xScale));

       // text label for the x axis
       svg.append("text")
           .attr("transform",
                 "translate(" + (w/2) + " ," +
                                (h + margin.top + 20) + ")")
           .style("text-anchor", "right")
           .text("Consumer Confidence");

       // add the y-axis
       svg.append("g")
          .attr("transform", "translate(" + margin.left + ", 0)")
          .call(d3.axisLeft(yScale));

       // text label for the y axis
       svg.append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 0 + margin.left/4)
           .attr("x",0 - (h / 2))
           .attr("dy", "1em")
           .style("text-anchor", "middle")
           .text("Women researchers (headcount)");

    }

    // button to swap over datasets
    d3.select("body")
      .append("button")
      .text("2007")
      .on("click", function() {
         //select new data
         dataIndex = 2007;
         make_scatter(dataIndex);
       });

     // button to swap over datasets
     d3.select("body")
       .append("button")
       .text("2015")
       .on("click", function() {
          //select new data
          dataIndex = 2015;
          make_scatter(dataIndex);
        });

     // button to swap over datasets
     d3.select("body")
       .append("button")
       .text("2007-2015")
       .on("click", function() {
          //select new data
          dataIndex = 1;
          make_scatter(dataIndex);
        });

  }).catch(function(e){
    throw(e);
  });
};
