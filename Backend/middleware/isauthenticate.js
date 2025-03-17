const jwt = require("jsonwebtoken");
const isauthenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(201)
      .json({
        message: "user is not authenticate so plz authenticate your self",
      });
  jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    if (error) {
      return res.status(200).json({ error:error.message });
    } 
      req.id=decode.userId;
      next();
  });
};
module.exports = isauthenticate;
