class PagesController {
  async showHomePage(req, res) {
    res.render('home')
  }

  async showAboutPage(req, res) {
    res.render('about')
  }

  async showLogon(req, res) {
    res.render('logon')
  }
}

module.exports = new PagesController()
