const authService = require("../services/AuthService");

exports.login = async (req, res) => {
  try {
    const loggedInUser = await authService.login(req.body);
    res.cookie('user', 'loggedInUser', { maxAge: 90000000000000, httpOnly: true })
    res.json({ data: loggedInUser, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {

    res.cookie('user', '', { expires: new Date(0), httpOnly: true });
    res.cookie('user_id', '', { expires: new Date(0), httpOnly: true });
    res.json({ data: {}, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
