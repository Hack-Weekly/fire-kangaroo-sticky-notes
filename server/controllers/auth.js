module.exports = {
    ensureAuth: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.json({ "msg": "authentication failed (ensureAuth)" })
        }
    }
}