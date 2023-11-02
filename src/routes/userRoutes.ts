import { express } from '../../server';

const {
  registerUser,
  loginUser,
  currentUser,
} = require('../controllers/userController');
const userValidateToken = require('../middleware/validateTokenHandler');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/current', userValidateToken, currentUser);

module.exports = userRouter;
