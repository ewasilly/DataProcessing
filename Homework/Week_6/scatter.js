// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot

window.onload = function() {

  // retrieve data with API
  var msti = "https://raw.githubusercontent.com/ewasilly/DataProcessing/master/Homework/Week_5/msti.json";
  var consconf = "https://raw.githubusercontent.com/ewasilly/DataProcessing/master/Homework/Week_5/consconf.json";
  var spending = "https://raw.githubusercontent.com/ewasilly/DataProcessing/master/Homework/Week_6/data.json";

  var requests = [d3.json(consconf), d3.json(msti), d3.json(spending)];
  var cc_countries = [];
  var cc_years = [];
  var countries_scatter = [];
  var different_years = [];


  // Function for parsing the data for Women in Research data
  function parse_WiS(rawdata, response) {
    var data = [];
    for (i = 0; i < rawdata.length; i++) {
      data.push([rawdata[i]['time'], rawdata[i]['datapoint']]);
    }
    return data;
  }

  // Function for calculating mean value of Women in Research data
  // and for retrieving the data value of the year 2007 and 2015
  function calculate_datapoints_WiS(data) {
    total = 0;
    for (i = 0; i < data.length; i++) {
      total = total + data[i][1];
      if (data[i][0] == "2007") {
        // round off to 2 decimals
        var data2007 = Number(parseFloat(data[i][1].toFixed(2)));
      }
      else if (data[i][0] == "2015") {
        data2015 = Number(parseFloat(data[i][1].toFixed(2)));
      }
    }
    var mean = total / data.length;
    mean = parseFloat(mean).toFixed(2);
    mean = Number(mean);

    return [mean, data2007, data2015];
  }

  function parse_cc(rawdata, fullname_country) {
    var data = [];
    for (i = 0; i < rawdata.length; i++) {
      if (rawdata[i]['Country'] == fullname_country) {
        data.push([parseInt(rawdata[i]['time']), rawdata[i]['datapoint']]);
      }
    }
    return data;
  }

  function calculate_datapoints_CC(data) {
    var total = 0;
    for (i = 0; i < data.length; i++) {
      total = total + data[i][1];
      if (data[i][0] == 2007) {
        var data2007 = data[i][1];
      }
      else if (data[i][0] == 2015) {
        var data2015 = data[i][1];
      }
    }
    var mean = (total / data.length);
    mean = parseFloat(mean).toFixed(2);
    mean = Number(mean);

    return [mean, data2007, data2015];
  }

  function filter_dataset(dataset) {
    for (i = 0; i < dataset.length; i++) {
      if (dataset[i][0] == null) {
        dataset.splice(i, 1);
      }
      else if (dataset[i][1] == null) {
        dataset.splice(i, 1);
      }
    }
    return dataset;
  }


  // Function for parsing the data for education spending
  function parse_spending(country, response) {
    var country_spending = [];
    response_loc = response[2]['LOCATION']
    Object.keys(response_loc).forEach(function(key) {
      if (response_loc[key] == country){
        year = response[2]['TIME'][key];
        value = response[2]['Value'][key];
        if (value != null) {
        country_spending.push({"year": year, "value": value});
        }
      }
    })
    return country_spending;
  }


  Promise.all(requests).then(function(response) {

    console.log(response);


    var msti_fr = [];
    var msti_deu = [];
    var msti_kor = [];
    var msti_nl = [];
    var msti_por = [];
    var msti_uk = [];

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


    var dataFRmsti = parse_WiS(msti_fr, response);
    var dataDEUmsti = parse_WiS(msti_deu, response);
    var dataKORmsti = parse_WiS(msti_kor, response);
    var dataNLmsti = parse_WiS(msti_nl, response);
    var dataPORmsti = parse_WiS(msti_por, response);
    var dataUKmsti = parse_WiS(msti_uk, response);


    var mean_FRmsti = calculate_datapoints_WiS(dataFRmsti)[0];
    var dataFRmsti2007 = calculate_datapoints_WiS(dataFRmsti)[1];
    var dataFRmsti2015 = calculate_datapoints_WiS(dataFRmsti)[2];

    var mean_DEUmsti = calculate_datapoints_WiS(dataDEUmsti)[0];
    var dataDEUmsti2007 = calculate_datapoints_WiS(dataDEUmsti)[1];
    var dataDEUmsti2015 = calculate_datapoints_WiS(dataDEUmsti)[2];

    var mean_KORmsti = calculate_datapoints_WiS(dataKORmsti)[0];
    var dataKORmsti2007 = calculate_datapoints_WiS(dataKORmsti)[1];
    var dataKORmsti2015 = calculate_datapoints_WiS(dataKORmsti)[2];

    var mean_NLmsti = calculate_datapoints_WiS(dataNLmsti)[0];
    var dataNLmsti2007 = calculate_datapoints_WiS(dataNLmsti)[1];
    var dataNLmsti2015 = calculate_datapoints_WiS(dataNLmsti)[2];

    var mean_PORmsti = calculate_datapoints_WiS(dataPORmsti)[0];
    var dataPORmsti2007 = calculate_datapoints_WiS(dataPORmsti)[1];
    var dataPORmsti2015 = calculate_datapoints_WiS(dataPORmsti)[2];

    var mean_UKmsti = calculate_datapoints_WiS(dataUKmsti)[0];
    var dataUKmsti2007 = calculate_datapoints_WiS(dataUKmsti)[1];
    var dataUKmsti2015 = calculate_datapoints_WiS(dataUKmsti)[2];

    var dataFRcc = parse_cc(response[0], "France");
    var dataNLcc = parse_cc(response[0], "Netherlands");
    var dataPORcc = parse_cc(response[0], "Portugal");
    var dataDEUcc = parse_cc(response[0], "Germany");
    var dataUKcc = parse_cc(response[0], "United Kingdom");
    var dataKORcc = parse_cc(response[0], "Korea");

    var mean_FRcc = calculate_datapoints_CC(dataFRcc)[0];
    var dataFRcc2007 = calculate_datapoints_CC(dataFRcc)[1];
    var dataFRcc2015 = calculate_datapoints_CC(dataFRcc)[2];

    var mean_NLcc = calculate_datapoints_CC(dataNLcc)[0];
    var dataNLcc2007 = calculate_datapoints_CC(dataNLcc)[1];
    var dataNLcc2015 = calculate_datapoints_CC(dataNLcc)[2];

    var mean_PORcc = calculate_datapoints_CC(dataPORcc)[0];
    var dataPORcc2007 = calculate_datapoints_CC(dataPORcc)[1];
    var dataPORcc2015 = calculate_datapoints_CC(dataPORcc)[2];

    var mean_DEUcc = calculate_datapoints_CC(dataDEUcc)[0];
    var dataDEUcc2007 = calculate_datapoints_CC(dataDEUcc)[1];
    var dataDEUcc2015 = calculate_datapoints_CC(dataDEUcc)[2];

    var mean_UKcc = calculate_datapoints_CC(dataUKcc)[0];
    var dataUKcc2007 = calculate_datapoints_CC(dataUKcc)[1];
    var dataUKcc2015 = calculate_datapoints_CC(dataUKcc)[2];

    var mean_KORcc = calculate_datapoints_CC(dataKORcc)[0];
    var dataKORcc2007 = calculate_datapoints_CC(dataKORcc)[1];
    var dataKORcc2015 = calculate_datapoints_CC(dataKORcc)[2];

    // Append the div tooltip to html body
    var tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style("opacity", 0);


    // get datapoints for years 2007-2015
    // 0 = Europe
    // 1 = Asia
    var dataset1 = [[mean_FRcc, mean_FRmsti, 0, 0, "France"], [mean_NLcc, mean_NLmsti,
    0, 2, "Netherlands"], [mean_PORcc, mean_PORmsti, 0, 3, "Portugal"], [mean_DEUcc, mean_DEUmsti,
    0, 1, "Germany"], [mean_UKcc, mean_UKmsti, 0, 5, "United Kingdom"], [mean_KORcc, mean_KORmsti,
    1, 4, "Korea"]];

    // get datapoints for year 2007
    var dataset2007 = [[dataFRcc2007, dataFRmsti2007, 0, 0, "France"],
    [dataNLcc2007, dataNLmsti2007, 0, 2, "Netherlands"], [dataPORcc2007, dataPORmsti2007,
    0, 3, "Portugal"], [dataDEUcc2007, dataDEUmsti2007, 0, 1, "Germany"], [dataUKcc2007,
    dataUKmsti2007, 0, 5, "United Kingdom"], [dataKORcc2007, dataKORmsti2007, 1, 4, "Korea"]];

    // get datapoints for year 2015
    var dataset2015 = [[dataFRcc2015, dataFRmsti2015, 0, 0, "France"], [dataNLcc2015,
    dataNLmsti2015, 0, 2, "Netherlands"], [dataPORcc2015, dataPORmsti2015, 0, 3, "Portugal"],
    [dataDEUcc2015, dataDEUmsti2015, 0, 1, "Germany"], [dataUKcc2015, dataUKmsti2015,
    0, 5, "United Kingdom"], [dataKORcc2015, dataKORmsti2015, 1, 4, "Korea"]];

    var spending_FR = parse_spending('FRA', response);
    var spending_DEU = parse_spending('DEU', response);
    var spending_NL = parse_spending('NLD', response);
    var spending_POR = parse_spending('PRT', response);
    var spending_KOR = parse_spending('KOR', response);
    var spending_UK = parse_spending('GBR', response);

    var dataset_edu_GDP = [
      {
        country: "FR",
        values: spending_FR
      },
      {
        country: "DEU",
        values: spending_DEU
      },
      {
        country: "NL",
        values: spending_NL
      },
      {
        country: "POR",
        values: spending_POR
      },
      {
        country: "KOR",
        values: spending_KOR
      },
      {
        country: "UK",
        values: spending_UK
      }
    ];

    console.log(dataset_edu_GDP);

    function makeSVG(data) {
      // Set the dimensions of the svg
      var margin = {top: 30, right: 20, bottom: 70, left: 50},
          width = 600 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

      // Set the ranges
      var x = d3.scaleLinear().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

      // Save array of keys to variable
      var keys = Object.keys(data);


      // setting the width and height of the svg
      var svgLine = d3.select("body")
        .append('svg')
          .style("width", width + margin.left + margin.right + "px")
          .style("height", height + margin.top + margin.bottom + "px")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")
          .attr("class", "svg")
          .attr("id", "svgLine");

      // Create a list of all the datapoints
      // This will be used for scaling
      superList = []

      data.forEach(function(d){
        d.values.forEach(function(t){
          superList.push(t)
        })
      })

      // Scale the range of the data
      x.domain(d3.extent(superList, function(d) {
        return d.year;
      }));
      y.domain([0, d3.max(superList, function(d) {
        return d.value;
      })]);

      // Set up the x axis
      var xAxis = svgLine.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "xAxis")
        .call(d3.axisBottom(x)
        .ticks(8)
        .tickSize(0, 0)
        // .tickFormat(d3.format(d3.timeFormat("%Y")))
        .tickSizeInner(0)
        .tickPadding(10));

      // Add the Y Axis
      var yAxis = svgLine.append("g")
       .attr("class", "yAxis")
       .call(d3.axisLeft(y)
       .ticks(5)
       .tickSizeInner(0)
       .tickPadding(6)
       .tickSize(0, 0));

      // Add a label to the y axis
      svgLine.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 0 - 35)
       .attr("x", 0 - (height / 2))
       .attr("dy", "1em")
       .style("text-anchor", "middle")
       .text("GDP (%)")
       .attr("class", "y axis label");

       return svgLine
     }

     makeSVG(dataset_edu_GDP);


    superLijst = []
    function makeMultiLine(data, dataKey) {

      svgLine = d3.select("#svgLine")
      // Set the dimensions of the svg
      var margin = {top: 30, right: 20, bottom: 70, left: 50},
          width = 600 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

      // Set the ranges
      var x = d3.scaleLinear().range([0, width]).domain([2008, 2015]);
      var y = d3.scaleLinear().range([height, 0]).domain([0, 2.5]);

      console.log(data);

      // Define the line
      var line = d3.line()
        .x(function(d) {
          return x(d.year);
        })
        .y(function(d) {
          console.log(y(d.value));
          return y(d.value);
        })

      superLijst.push(dataKey)

       // Draw the line
       // Specify which line should be drawn by specifying the key
       // 0=FR, 1=DEU, 2=NL, 3=POR, 4=KOR, 5=UK
       svgLine.selectAll(".line")
         .data(superLijst)
         .enter()
         .append("path")
         .attr("class", "line")
         .attr("d", function(d) {
           return line(d.values);
          })
          // add the tooltips
          .on("mouseover", function(d) {
            tooltip.transition()
              .duration(200)
              .style("opacity", .9);
            tooltip.html("1st measurement" + "<br/>" + "Year: " + d.values[0]['year'] + "<br/>" + "GDP: " + d.values[0]['value'])
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
            })
          .on("mouseout", function(d) {
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          })

    }


    dataset1 = filter_dataset(dataset1);
    dataset2007 = filter_dataset(dataset2007);
    dataset2015 = filter_dataset(dataset2015);


    // set margins
    var margin = {top: 30, right: 30, bottom: 50, left: 70},
    w = 600 - margin.left - margin.right,
    h = 400 - margin.top - margin.bottom;

    // create SVG element
    var svg = d3.select("body")
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin. bottom);

    // function to create scatterplot with chosen dataset
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

      // create color scale
      // blue for European country
      // yellow for Asian contry
      var colors = d3.scaleOrdinal()
                     .domain([0, 1])
                     .range(["#4362CE", "#EED25E"]);

      var tooltip = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

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
        .attr("fill", function(d) {
          return colors(d[2]);
        })
        // add the tooltips
        .on("mouseover", function(d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(d[4] + ":" + "<br/>" + "CC: " + d[0] + "," + " " + "WiS: " + d[1])
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          })
        .on("mouseout", function(d) {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        })
        .on("click", function(d, i){
          var country = d[3];
          makeMultiLine(dataset_edu_GDP, dataset_edu_GDP[country]);
        });

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

    make_scatter(1);


  }).catch(function(e){
    throw(e);
  });
};
