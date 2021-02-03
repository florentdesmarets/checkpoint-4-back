const router = require('express').Router();
const adminRouter = require('./routes/admin.routes.js');
const contactRouter = require('./routes/contact.routes.js');
const projectsRouter = require('./routes/projects.routes.js');
const sn_linksRouter = require('./routes/sn_links.routes.js');

router.use('/admins', adminRouter);
router.use('/contact', contactRouter);
router.use('/projects', projectsRouter);
router.use('/sn_links', sn_linksRouter);



module.exports = router;