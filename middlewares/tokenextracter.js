import jwt from "jsonwebtoken";

const fetchUser = (req, res, next) => {
  //Getting token from user req's header
  let token = req.headers["auth-token"];
  //Return 401 res if token is not present in header
  if (!token) {
    return res.status(401).send({ msg: "token is not present" });
  }

  //Handle error
  try {
    //Verify string using the secret key
    let data = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    //Adding user object of data in req.user
    req.user = data.email;

    //Running next function
    next();
    // console.log(req.user);
    // return res.send({ msg: "let me done" });
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({ msg: error.message });
  }
};

export default fetchUser;
