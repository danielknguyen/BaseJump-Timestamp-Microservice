module.exports = function(app, moment) {

  function unixToNatural(string) {
    var m = moment.unix(string);
    var natural = m.format("MMMM-DD-YYYY");
    return natural;
  }

  function naturalToUnix(string) {
    var m = moment(string);
    var unixtime = Number(m.format('X'));
    return unixtime;
  }

  app.get('/', function(req, res) {
    res.render('index.html');
  });

  app.get('/timestamp/:q', function(req, res) {
    var date = {};
    var urlParameter = req.params.q;

    // date formats
    const formats = [
      'X',
      'MMMM D, YYYY',
      'MMMMD, YYYY',
      'MMMM D,YYYY',
      'MMMMD,YYYY',
      'MMMM-D-YYYY',
      'MMMM D YYYY',
      'MMM D, YYYY',
      'MMM D YYYY',
      'MMM-D-YYYY',
      'MMM D,YYYY',
      'MMMD, YYYY',
      'MMMD,YYYY',
      'D MMMM YYYY',
      'D-MMMM-YYYY',
      'D MMM YYYY',
      'D-MMM-YYYY'
    ];

    // momentjs date validator
    let timestamp = moment(urlParameter, formats, true);

    // check if timestamp is true
    if (timestamp.isValid()) {
      // console.log(timestamp);
      date.natural = moment(urlParameter).format("MMMM-DD-YYYY");
      date.unix = naturalToUnix(urlParameter);
      // if false set date object to null
    } else {
      date.natural = null;
      date.unix = null;
    }

    // check unix logic
    if (!isNaN(urlParameter) > 0) {

      // check if valid unix
      let valid = moment(urlParameter, "X", true);

      if (valid) {
        date.natural = unixToNatural(urlParameter);
        date.unix = urlParameter;
      } else {
        date.natural = null;
        date.unix = null;
        // console.log("unix bool: " + valid);
      }
    }

    res.send(date);
  });
}
