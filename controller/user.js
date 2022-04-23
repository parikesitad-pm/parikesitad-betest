const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Redis = require("../services/config");

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
    let getUsers;

    const redis_key = "get_all_users";
    const { reply } = await Redis.getCache(redis_key);
    console.log(redis_key, reply);
    if (reply) {
      console.log("exec cache");
      getUsers = JSON.parse(reply);
    } else {
      console.log("exec db");
      const resUser = await User.find().sort({ createdAt: -1 });
      const redisValue = JSON.stringify(resUser);
      Redis.setCache(redis_key, redisValue);
      getUsers = resUser;
    }

    res.status(200).json(getUsers);
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
  const { identityNumber, accountNumber, emailAddress, userName } = req.body;

  const id = req.params.id;

  const newUser = {
    identityNumber,
    accountNumber,
    emailAddress,
    userName,
  };
  try {
    let user = await User.findOne({ _id: id });

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

/**
 *@param {accountNumber}
 **/
exports.getByAccount = async (req, res) => {
  const accountNumber = req.params.id;

  try {
    let numberAkun;
    const redis_key = `user_account_${accountNumber}`;
    const { reply } = await Redis.getCache(redis_key);
    console.log(redis_key, reply);
    if (reply) {
      console.log("exec cache");
      numberAkun = JSON.parse(reply);
    } else {
      console.log("exec db");
      const resAccount = await User.findOne({ accountNumber });
      const redisValue = JSON.stringify(resAccount);
      Redis.setCache(redis_key, redisValue);
      numberAkun = resAccount;
    }

    res.status(200).json(numberAkun);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

/**
 * @param {identityNumber}
 **/
exports.getByIdentity = async (req, res) => {
  const identityNumber = req.params.id;

  try {
    let idNumber;
    const redis_key = `user_id_${identityNumber}`;
    const { reply } = await Redis.getCache(redis_key);
    console.log(redis_key, reply);
    if (reply) {
      console.log("exec cache");
      idNumber = JSON.parse(reply);
    } else {
      console.log("exec db");
      const resId = await User.findOne({ identityNumber });
      const redisValue = JSON.stringify(resId);
      Redis.setCache(redis_key, redisValue);
      idNumber = resId;
    }

    res.status(200).json(idNumber);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
