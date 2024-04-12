import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Divider, Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../utils/EyeFilledIcon ";
import { EyeSlashFilledIcon } from "../utils/EyeSlashFilledIcon ";
import { FcGoogle } from "react-icons/fc";
import Icon from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmedRef = useRef();
  const [error, setError] = useState();

  const { signup, signInWithGoogle } = useAuth();
  console.log(error);

  async function handleSubmit(e) {
    setError();
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmedRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError();
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("An error occurred while creating your account.");
    }
  }

  const signInWithPopUp = async () => {
    try {
      setError();
      await signInWithGoogle();
      navigate("/home");
    } catch (e) {
      setError("An error occurred while creating your account.");
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen max-w-full max-h-full ">
      <div className="flex flex-row w-4/5 h-4/5  gap-4  pr-4">
        <div className="flex justify-center items-center flex-col w-1/2 h-full pr-8 -ml-6 ">
          <Logo src={Icon}></Logo>
          <p className=" text-5xl text-neutral-200  text-center font-bold mt-10  ">
            Choubik Loubik
            <p style={{ color: "#9455d3" }}>Mimic</p>
            Bin Idik
          </p>
        </div>

        <Divider orientation="vertical"></Divider>
        <div className="flex items-center flex-col w-1/2 h-full ml- mt-12 gap-8 ">
          <Input
            type="email"
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
            className="w-2/3 mt-8 "
            isInvalid={error ? true : false}
            ref={emailRef}
          />
          <Input
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            ref={passwordRef}
            isInvalid={error ? true : false}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon
                    EyeFilledIcon
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-2/3"
          />

          <Input
            label=" Password Confirmation"
            variant="bordered"
            placeholder="Confirm your password"
            ref={passwordConfirmedRef}
            isInvalid={error ? true : false}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon
                    EyeFilledIcon
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="w-2/3"
          />
          {error && (
            <p className=" -mt-5" style={{ color: "#f01362" }}>
              Please Enter valid Data
            </p>
          )}

          <Button
            className="w-1/3"
            color="secondary"
            variant="shadow"
            onClick={handleSubmit}
          >
            Register
          </Button>

          <Link to="/" style={{ color: "#9455d3" }} className=" text-blue-600 ">
            Nah i'm good😎
          </Link>

          <Divider className="mt-4 mb-4 w-2/3"></Divider>

          <Button
            onClick={signInWithPopUp}
            className=" w-2/5 h-12"
            color="secondary"
            variant="ghost"
            startContent={<FcGoogle />}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

const Logo = styled.img`
  height: 40%;
  width: 40%;
`;

export default SignUp;
