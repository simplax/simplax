function isLoggedIn(req, res, next) {
  if (req.user) {
    next()
  }
  else {
    next({ status: 403, message: 'Unauthorized' })
  }
}

const adminGithubIds = [39859424, 29504917]

function isAdmin(req, res, next) {
  if (req.user && adminGithubIds.includes(req.user._github)) {
    next()
  }
  else {
    next({ status: 403, message: 'Unauthorized' })
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
}
