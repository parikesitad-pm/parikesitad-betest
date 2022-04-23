const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const config = require("../services/config");

exports.login = async (req, res) => {
  const { emailAddress } = req.body;

  try {
    let user = await User.findOne({ emailAddress });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Email notFound" }] });
    }

    if (user) {
      const authToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 36000,
      });

      user;

      res.status(200).json({
        authToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Server error",
    });
  }
};

exports.getUserList = async (req, res) => {
  try {
    // const cacheKey = "users_all";
    // const cachedData = await config.get(cacheKey);
    // if (cachedData) {
    //   console.log("got cached data");
    //   return res.json(cachedData);
    // }

    const user = await User.find().sort({ createdAt: -1 });
    // await config.saveWithTtl(cacheKey, user, 300);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "fetchIng Failed | Server Error" });
  }
};

exports.addUser = async (req, res) => {
  const { userName, accountNumber, emailAddress, identityNumber } = req.body;

  try {
    let isAccountNumber;
    isAccountNumber = await User.findOne({ accountNumber });

    if (isAccountNumber) {
      res.status(400).send({ message: "Account Number already exists" });
    } else {
      const newUser = new User({
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
      });

      const user = newUser;

      await user.save();

      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id, identityNumber, accountNumber, emailAddress, userName } =
    req.body;

  const newUser = {
    identityNumber,
    accountNumber,
    emailAddress,
    userName,
  };
  try {
    let user = await User.findOne({ id });

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    if (user) {
      user = await User.findOneAndUpdate(
        { _id: id },
        { $set: newUser },
        { new: true }
      );
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();
    res.json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// * @param {accountNumber}
exports.getByAccount = async (req, res) => {
  const accountNumber = req.params.id;

  try {
    const user = await User.findOne({ accountNumber });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// * @param {identityNumber}
exports.getByIdentity = async (req, res) => {
  const identityNumber = req.params.id;

  try {
    const user = await User.find({ identityNumber });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
