module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index.html');
  });

  app.get('/timestamp/:q', function(req, res) {
    var date = {};
    var urlParameter = req.params.q;
    // console.log(urlParameter)

    res.send(date);
  });
}
