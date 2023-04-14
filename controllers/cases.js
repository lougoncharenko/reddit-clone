module.exports = (app) => {
    // New Route
    app.get('/cases/new', (req, res) => {
        res.render('cases-new', {});
    });

    // Create Route
    app.post('cases/create', (req, res) => {
        console.log("OH ho")

        res.redirect('/cases/${caseid}');
    });

    // Show Route
    app.get('/cases/:id', (req, res) => {
        res.render()
    })
  };
