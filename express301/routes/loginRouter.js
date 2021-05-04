const express = require('express');
const router = express.Router();

function validate(req, res, next) {
    res.locals.validate = true;
    next();
}

// It's possible to use middleware in here, as well
router.use(validate);

router.route('/').all((req, res, next) => {
    res.json({ message: { loggedIn: res.locals.validate } });
});

module.exports = router;
