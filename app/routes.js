//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()



// Add your routes here

router.post('/v03-journey-1/starting-question', function (req, res) {
    const change = req.body['what-do-you-need-to-change']
    if (change === 'address') {
        res.redirect('/v03-journey-1/task-list.html')
    }else if (change === 'other') {
        res.redirect('/v03-journey-1/my-change-is-not-listed')
    }else {
        res.redirect('/v03-journey-1/starting-question')
    }
})

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