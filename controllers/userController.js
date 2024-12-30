const userSchema = require("../models/users");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

// for Sign-up
const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userSchema.findOne({ username });
    const existingEmail = await userSchema.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (username.length < 3) {
      return res.status(400).json({ message: "Username should have at least 3 characters" });
    }

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

       // Hashing the password before saving
       const hashedPassword = await bcrypt.hash(req.body.password, 10);


    const newUser = new userSchema({
      username: req.body.username,
      email: req.body.email,
      password:  hashedPassword,
    });

    await newUser.save();
    return res.status(200).json({ message: "SignIn Successfully" });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

// for Login


const signIn = async (req, res) => {
  const { username, password } = req.body; // Use req.query for GET requests

  try {
    // Step 1: Check if the user exists
    const existingUser = await userSchema.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Step 2: Compare the provided password with the stored password
    bcrypt.compare(password, existingUser.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Server error during password comparison" });
      }

      if (isMatch) {
        // Step 3: Create JWT token
        const authClaims = {
          username: existingUser.username,
          jti: jwt.sign({}, 'leapxTM') // JWT ID (jti) can be a unique identifier, or just an empty object for this purpose
        };

        const token = jwt.sign({ authClaims }, 'leapxTM', { expiresIn: "2d" });

        // Return success response with the token
        return res.status(200).json({
          id: existingUser._id,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  signUp,signIn
};

