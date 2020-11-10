import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  generateUserDocument,
} from "../../firebase/firebase";

const SignIn = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await auth.signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      console.log("user signed in");
      generateUserDocument(user);
      this.props.history.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="example@domain.com"
          value={inputs.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>

      <button onClick={signInWithGoogle}>Continue With Google</button>
      <Link to="/signup">Sign Up</Link>
    </>
  );
};

export default withRouter(SignIn);
