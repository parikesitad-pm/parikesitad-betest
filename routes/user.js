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

router.get("/all", requireSignIn, getUserList);
router.post("/", requireSignIn, addUser);
router.put("/", requireSignIn, updateUser);
router.delete("/:id", requireSignIn, deleteUser);

// *
//  @param {accountNumber}
// *
router.get("/account/:id", requireSignIn, getByAccount);
// *
// @param {identityNumber}
// *
router.get("/ID/:id", requireSignIn, getByIdentity);

module.exports = router;
