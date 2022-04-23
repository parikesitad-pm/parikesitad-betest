express = require("express");
const router = express.Router();
const {
  login,
  getUserList,
  addUser,
  updateUser,
  deleteUser,
  getByAccount,
  getByIdentity,
} = require("../controller/user");
const { requireSignIn } = require("../middleware/auth");

router.post("/login", login);

router.get("/all", getUserList);
router.post("/", requireSignIn, addUser);
router.put("/", requireSignIn, updateUser);
router.delete("/:id", requireSignIn, deleteUser);
// get accountNumber
router.get("/account/:id", getByAccount);
// get identityNumber
router.get("/ID/:id", requireSignIn, getByIdentity);

module.exports = router;
