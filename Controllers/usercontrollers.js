const  jwt = require("jsonwebtoken");
const user = require("../Models/usermodel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const finduser = await user.findOne({ username });
    if (!finduser) {
      const newuser = new user({ username, email, password, phone });
      const salt = 10;
      const hashedpass = await bcrypt.hash(password, salt);
      newuser.password = hashedpass;

      await newuser.save();
      const token=jwt.sign({id:newuser._id},process.env.SECRET_KEY)
      res.status(200).send({ msg: "register successfully!", newuser,token });
    } else {
      res.status(400).send({ msg: "uszrname already exists" });
    }
  } catch (error) {
    res.status(500).send({ msg: "cannot register ", error });
  }
};
  
exports.getall = async (req, res) => {
  try {
    const users=await user.find()
    res.status(200).send({msg:"users found successfully!",users})
} catch (error) {
    res.status(500).send({msg:"error on getting all users",error})
}
};

exports.deleteuser = async (req, res) => {
  try {
    const { _id } = req.params;
    await user.findByIdAndDelete({ _id });
    res.status(200).send({ msg: "deleted successfully!" });
  } catch (error) {
    res.status(400).send({ msg: "error on delete user", error });
  }
};

exports.upuser = async (req, res) => {
  try {
    const { _id } = req.params;
    const newuser = req.body;
    const users = await user.updateOne({ _id }, { $set: newuser });
    //user.findByIdAndUpdate({_id},newuser)
    res.status(200).send({ msg: "user updated successfully!", users });
  } catch (error) {
    res.status(400).send({ msg: "error on updating user!", error });
  }
};
