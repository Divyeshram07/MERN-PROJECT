const mongoose = require("mongoose");
const auth = require('./middleware/auth');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
module.exports = mongoose.model("User", userSchema);

router.get('/dashboard', auth, (req, res) => {
    res.send('Protected content for ' + req.user.id);
  });