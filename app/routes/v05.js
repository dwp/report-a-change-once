module.exports = function (router) {

// Declare the entry point service - customer account
router.get('/v05/index.html', function(req, res) {
    res.redirect("/v05/customer-account/account-home")
})

// Declare the RACO start point - when did you move?
router.get('/v05/report-a-change-once/index.html', function(req, res) {
    res.redirect("/v05/report-a-change-once/start")
})


router.post('/v05/report-a-change-once/start', function(req, res) {
    res.redirect("/v05/report-a-change-once/when-did-you-move-to-your-new-address")
})

/* 
 * Use this to work out if date entry is in the future.
 * 
router.post('/v05/report-a-change-once/have-you-moved-into-your-new-address', function (req, res) {

  // Make a variable and give it the value from 'permanentTempMove' to take the value of the radio list name
  var haveYouMoved = req.session.data['haveYouMoved']

  // Check whether the variable matches a condition
  if (haveYouMoved == "yes"){
    // Send user to next page
    res.redirect('/v05/report-a-change-once/when-did-you-move-to-your-new-address')
  } else {
    // Send user to ineligible page
    res.redirect('/v05/report-a-change-once/you-cannot-use-this-service/future-date')
  }

})

router.post('/v05/report-a-change-once/when-did-you-move-to-your-new-address', function(req, res) {
    res.redirect("/v05/report-a-change-once/is-this-move-permanent-or-temporary")
})
  */

router.post('/v05/report-a-change-once/when-did-you-move-to-your-new-address', function (req, res) {
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
    return res.redirect('/v05/report-a-change-once/you-cannot-use-this-service/future-date')
  }

  // Otherwise (today or past)
  res.redirect('/v05/report-a-change-once/is-this-move-permanent-or-temporary')
})

router.post('/v05/report-a-change-once/is-this-move-permanent-or-temporary', function (req, res) {

  // Make a variable and give it the value from 'permanentTempMove' to take the value of the radio list name
  var permanentTempMove = req.session.data['permanentOrTemporary']

  // Check whether the variable matches a condition
  if (permanentTempMove == "permanent"){
    // Send user to next page
    res.redirect('/v05/report-a-change-once/which-country-is-your-new-address-in')
  } else {
    // Send user to ineligible page
    res.redirect('/v05/report-a-change-once/you-cannot-use-this-service/temporary-address')
  }

})

router.post('/v05/report-a-change-once/which-country-is-your-new-address-in', function (req, res) {

  // Make a variable and give it the value from 'permanentTempMove' to take the value of the radio list name
  var country = req.session.data['country']

  // Check whether the variable matches a condition
  if (country === "england" || country === "wales") {  
    // Send user to next page
    res.redirect('/v05/report-a-change-once/have-you-moved-into-a-care-home')
  } else {
    // Send user to ineligible page
    res.redirect('/v05/report-a-change-once/you-cannot-use-this-service/not-in-england-and-wales')
  }

})

router.post('/v05/report-a-change-once/what-type-of-property', function (req, res) {

  // Make a variable and give it the value from 'permanentTempMove' to take the value of the radio list name
  var propertyType = req.session.data['propertyType']

  // Check whether the variable matches a condition
  if (propertyType === "houseBungalow" || propertyType === "flatApartmentAnnexe") {    
    // Send user to next page
    res.redirect('/v05/report-a-change-once/address/find-your-new-address')
  } else {
    // Send user to ineligible page
    res.redirect('/v05/report-a-change-once/you-cannot-use-this-service/care-home')
  }

})

router.post('/v05/report-a-change-once/have-you-moved-into-a-care-home', function (req, res) {

  // Make a variable and give it the value from 'permanentTempMove' to take the value of the radio list name
  var careHome = req.session.data['careHome']

  // Check whether the variable matches a condition
  if (careHome == "no"){
    // Send user to next page
    res.redirect('/v05/report-a-change-once/address/find-your-new-address')
  } else {
    // Send user to ineligible page
    res.redirect('/v05/report-a-change-once/you-cannot-use-this-service/care-home')
  }

})

router.post('/v05/report-a-change-once/address/find-your-new-address', function(req, res) {
    res.redirect("/v05/report-a-change-once/address/select-your-new-address")
})

router.post('/v05/report-a-change-once/address/select-your-new-address', function(req, res) {
    res.redirect("/v05/report-a-change-once/address/confirm-address")
})

router.post('/v05/report-a-change-once/address/confirm-address', function(req, res) {
    res.redirect("/v05/report-a-change-once/check-your-answers")
})

router.post('/v05/report-a-change-once/address/enter-address-manually', function(req, res) {
    res.redirect("/v05/report-a-change-once/check-your-answers")
})

router.post('/v05/report-a-change-once/check-your-answers', function(req, res) {
    res.redirect("/v05/report-a-change-once/confirmation")
})

router.post('/v05/report-a-change-once/confirmation', function(req, res) {
    res.redirect("/v05/customer-account/account-home")
})

router.post('/v05/customer-account/personal-details', function(req, res) {
    res.redirect("/v05/customer-account/account-home")
})


// Drop out screens
router.post('/v05/report-a-change-once/you-cannot-use-this-service/future-date', function(req, res) {
    res.redirect("/v05/customer-account/account-home")
})

router.post('/v05/report-a-change-once/you-cannot-use-this-service/temporary-address', function(req, res) {
    res.redirect("/v05/customer-account/account-home")
})

router.post('/v05/report-a-change-once/you-cannot-use-this-service/not-in-england-and-wales', function(req, res) {
    res.redirect("/v05/customer-account/account-home")
})

router.post('/v05/report-a-change-once/you-cannot-use-this-service/care-home', function(req, res) {
    res.redirect("/v05/customer-account/account-home")
})

}