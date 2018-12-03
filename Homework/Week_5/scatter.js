// Name: Ewa Sillem
// Student number: 12149071
// Description: This file contains all the javascript code for the scatterplot

window.onload = function() {
  console.log('Yes, you can!');


  var msti = "msti.json";
  var consconf = "consconf.json";

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

    // add countries to msti dataset (retrieved from info in api)
    var france = [];
    var germany = [];
    var korea = [];
    var netherlands = [];
    var portugal = [];
    var uk = [];
    var dataFRcc = [];
    var dataNLcc = [];
    var dataPORcc = [];
    var dataDEUcc = [];
    var dataUKcc = [];
    var dataKORcc = [];


    for (i = 0; i < 9; i++) {
      france.push(response[1][i]);
    }

    for (i = 9; i < 14; i++) {
      germany.push(response[1][i]);
    }

    for (i = 14; i < 23; i++){
      korea.push(response[1][i]);
    }

    for (i = 23; i < 30; i++) {
      netherlands.push(response[1][i]);
    }

    for (i = 30; i < 39; i++) {
      portugal.push(response[1][i]);
    }

    for (i = 39; i < response[1].length; i++) {
      uk.push(response[1][i]);
    }

    console.log(france);
    console.log(germany);
    console.log(korea);
    console.log(netherlands);
    console.log(portugal);
    console.log(uk);

    // isolate the datapoint and the year that belongs to it from France
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
        response[0][i]['datapoint']]);
      }
    }

    console.log(dataFRcc);
    console.log(dataNLcc);
    console.log(dataPORcc);
    console.log(dataDEUcc);
    console.log(dataUKcc);
    console.log(dataKORcc);

    // calculate the mean data value of France for consumer confidence
    // years 2007 - 2015
    total_FRcc = 0;
    for (i = 0; i < dataFRcc.length; i++) {
      total_FRcc = total_FRcc + dataFRcc[i][1];
    }
    mean_FRcc = total_FRcc / dataFRcc.length;
    console.log(mean_FRcc);

    // calculate the mean data value of NL for consumer confidence
    // years 2007 - 2015
    total_NLcc = 0;
    for (i = 0; i < dataNLcc.length; i++) {
      total_NLcc = total_NLcc + dataNLcc[i][1];
    }
    mean_NLcc = total_NLcc / dataNLcc.length;
    console.log(mean_NLcc);

    // calculate the mean data value of Portugal for consumer confidence
    // years 2007 - 2015
    total_PORcc = 0;
    for (i = 0; i < dataPORcc.length; i++) {
      total_PORcc = total_PORcc + dataPORcc[i][1];
    }
    mean_PORcc = total_PORcc / dataPORcc.length;
    console.log(mean_PORcc);

    // calculate the mean data value of france for consumer confidence
    // years 2007 - 2015
    total_DEUcc = 0;
    for (i = 0; i < dataDEUcc.length; i++) {
      total_DEUcc = total_DEUcc + dataDEUcc[i][1];
    }
    mean_DEUcc = total_FRcc / dataFRcc.length;
    console.log(mean_DEUcc);

    // calculate the mean data value of UK for consumer confidence
    // years 2007 - 2015
    total_UKcc = 0;
    for (i = 0; i < dataUKcc.length; i++) {
      total_UKcc = total_UKcc + dataUKcc[i][1];
    }
    mean_UKcc = total_UKcc / dataUKcc.length;
    console.log(mean_UKcc);

    // calculate the mean data value of Korea for consumer confidence
    // years 2007 - 2015
    total_KORcc = 0;
    for (i = 0; i < dataKORcc.length; i++) {
      total_KORcc = total_KORcc + dataKORcc[i][1];
    }
    mean_KORcc = total_KORcc / dataKORcc.length;
    console.log(mean_KORcc);








    // set counter to decide to which country data belongs
    // counter = 0;
    // for (i = 0; i < response[1].length; i++) {
    //   if (parseInt(response[1][i]['time'] - parseInt(response[1][i + 1]) < 0 && counter == 0)) {
    //     france.push(response[1][i]);
    //     counter += 1;
    //   }
    //   else if (counter == 0) {
    //     france.push(response[1][i]);
    //   }
    //   else if ((parseInt(response[1][i]['time']) -
    //   parseInt(response[1][i+1]['time'])) < 0
    //   && counter == 1) {
    //     germany.push(response[1][i]);
    //     counter += 1;
    //   }
    //   else if (counter == 1) {
    //     germany.push(response[1][i]);
    //   }
    //   else if ((parseInt(response[1][i]['time']) -
    //   parseInt(response[1][i+1]['time'])) < 0
    //   && counter == 2) {
    //     korea.push(response[1][i]);
    //     counter += 1;
    //   }
    //   else if (counter == 2) {
    //     korea.push(response[1][i]);
    //   }
    //   else if ((parseInt(response[1][i]['time']) -
    //   parseInt(response[1][i+1]['time'])) < 0
    //   && counter == 3) {
    //     netherlands.push(response[1][i]);
    //     counter += 1;
    //   }
    //   else if (counter == 3) {
    //     netherlands.push(response[1][i]);
    //   }
    //   else if ((parseInt(response[1][i]['time']) -
    //   parseInt(response[1][i+1]['time'])) < 0
    //   && counter == 4) {
    //     portugal.push(response[1][i]);
    //     counter += 1;
    //   }
    //   else if (counter == 4) {
    //     portugal.push(response[1][i]);
    //   }
    //   else if ((parseInt(response[1][i]['time']) -
    //   parseInt(response[1][i+1]['time'])) < 0
    //   && counter == 5) {
    //     uk.push(response[1][i]);
    //     counter += 1;
    //   }
    //   else if (counter == 4) {
    //     uk.push(response[1][i]);
    //   }
    // }




    // ensure that years of data are the same

    // make a list of coordinates per country
    // [x,y] --> [patent applications to the EPO, consumer confidence]


  }).catch(function(e){
    throw(e);
  });


};
