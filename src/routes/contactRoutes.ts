import { express } from '../../server';

const contactsRouter = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

const contactsValidateToken = require('../middleware/validateTokenHandler');

contactsRouter.use(contactsValidateToken); // validates every routes under this middleware

contactsRouter.route('/').get(getContacts).post(createContact);

contactsRouter
  .route('/:id')
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = contactsRouter;
