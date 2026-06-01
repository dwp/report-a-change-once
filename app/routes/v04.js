module.exports = function (router) {

// Declare the entry point service - customer account
router.get('/v04/index.html', function(request, response) {
    response.redirect("/v04/customer-account/account-home")
})

// Declare the RACO start point - when did you move?
router.get('/v04/report-a-change-once/index.html', function(request, response) {
    response.redirect("/v04/report-a-change-once/when-did-you-move")
})

router.post('/v04/report-a-change-once/when-did-you-move', function (req, res) {
  const day = req.body["move-date-day"]
  const month = req.body["move-date-month"]
  const year = req.body["move-date-year"]

  // Create Date object (month is 0-based in JS)
  const enteredDate = new Date(year, month - 1, day)

  // Today's date (with time removed)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Check if date is in the future
  if (enteredDate > today) {
    return res.redirect('/v04/report-a-change-once/you-cannot-use-this-service/future-date')
  }

  // Otherwise (today or past)
  res.redirect('/v04/report-a-change-once/permanent-or-temporary-move')
})

router.post('/v04/report-a-change-once/permanent-or-temporary-move', function (req, res) {

  // Make a variable and give it the value from 'permanentTempMove' to take the value of the radio list name
  var permanentTempMove = req.session.data['permanentOrTemporary']

  // Check whether the variable matches a condition
  if (permanentTempMove == "permanent"){
    // Send user to next page
    res.redirect('/v04/report-a-change-once/which-country-do-you-live-in')
  } else {
    // Send user to ineligible page
    res.redirect('/v04/report-a-change-once/you-cannot-use-this-service/temporary-address')
  }

})

router.post('/v04/report-a-change-once/which-country-do-you-live-in', function (req, res) {

  // Make a variable and give it the value from 'permanentTempMove' to take the value of the radio list name
  var country = req.session.data['country']

  // Check whether the variable matches a condition
  if (country == "englandAndWales"){
    // Send user to next page
    res.redirect('/v04/report-a-change-once/address/what-is-your-new-address')
  } else {
    // Send user to ineligible page
    res.redirect('/v04/report-a-change-once/you-cannot-use-this-service/not-in-england-and-wales')
  }

})

router.post('/v04/report-a-change-once/address/what-is-your-new-address', function(request, response) {
    response.redirect("/v04/report-a-change-once/address/select-your-new-address")
})

router.post('/v04/report-a-change-once/address/select-your-new-address', function(request, response) {
    response.redirect("/v04/report-a-change-once/have-you-moved-into-a-care-home")
})

router.post('/v04/report-a-change-once/address/enter-address-manually', function(request, response) {
    response.redirect("/v04/report-a-change-once/have-you-moved-into-a-care-home")
})

router.post('/v04/report-a-change-once/have-you-moved-into-a-care-home', function(req, res) {

  // Make a variable and give it the value from 'permanentTempMove' to take the value of the radio list name
  var careHomeDecision = req.session.data['careHome']

  // Check whether the variable matches a condition
  if (careHomeDecision == "no"){
    // Send user to next page
    res.redirect('/v04/report-a-change-once/check-answers')
  } else {
    // Send user to ineligible page
    res.redirect('/v04/report-a-change-once/you-cannot-use-this-service/care-home')
  }

})

router.post('/v04/report-a-change-once/check-answers', function(request, response) {
    response.redirect("/v04/report-a-change-once/confirmation")
})


// Drop out screens
router.post('/v04/report-a-change-once/you-cannot-use-this-service/future-date', function(request, response) {
    response.redirect("/v04/customer-account/account-home")
})

router.post('/v04/report-a-change-once/you-cannot-use-this-service/temporary-address', function(request, response) {
    response.redirect("/v04/customer-account/account-home")
})

router.post('/v04/report-a-change-once/you-cannot-use-this-service/not-in-england-and-wales', function(request, response) {
    response.redirect("/v04/customer-account/account-home")
})

}