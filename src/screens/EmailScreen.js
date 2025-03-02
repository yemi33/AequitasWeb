import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAequitasResult } from "../actions/aequitasActions";
import { sendEmail } from "../actions/emailActions";
import { updateUserConfig } from "../actions/submitActions";
import Header from "../components/Header";
import OurNavbar from "../components/OurNavbar";

export default function EmailScreen () {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const result = useSelector((state) => state.getAequitasResult);
  const { aequitasRunResult, loading, error, status } = result;

  const {
    configUpdateResult,
    success: configUpdateSuccess,
    loading: configUpdateLoading,
    error: configUpdateError,
  } = useSelector((state) => state.configUpdate);

  const sendEmailResult = useSelector((state) => state.sendEmail);
  const {
    loading: sendEmailLoading,
    success: sendEmailSuccess,
    error: sendEmailError,
  } = sendEmailResult;

  const [emailSent, setEmailSent] = useState(false);
  const [aequitasGetResultSuccess, setAequitasGetResultSuccess] = useState(false);

  useEffect(() => {
    if ((!aequitasRunResult || status === "Pending") && !aequitasGetResultSuccess) {
      setTimeout(() => {
        dispatch(getAequitasResult(jobId));
      }, 10000);
    } else if (configUpdateSuccess && aequitasRunResult && status === "Success" && !emailSent) {
      const form = document.getElementById("emailForm");
      form.message.value = `Aequitas successfully run! This is the jobId ${jobId}`;
      form.to_name.value = "User";
      form.link.value = `https://aequitasweb.herokuapp.com/result/${jobId}`;
      setEmailSent(true);
      setAequitasGetResultSuccess(true);
      dispatch(sendEmail(form));
    }
  }, [configUpdateSuccess, aequitasRunResult, status, emailSent]);

  const [email, setEmail] = useState("");

  // https://www.emailjs.com/docs/tutorial/creating-contact-form/
  const submitHandler = (e) => {
    e.preventDefault();
    setEmail(document.getElementById("inputEmail").value);
    const bodyFormData = new FormData();
    bodyFormData.append("jobId", jobId);
    bodyFormData.append("email", email);
    dispatch(updateUserConfig(bodyFormData));
  };

  const tryAnotherRound = () => { // not being used currently cuz buggy
    navigate('/');
  }

  return (
    <div>
      <OurNavbar></OurNavbar>
      <Header>Email</Header>
      {configUpdateSuccess && (
        <div className="container">
          <div className="alert alert-success" role="alert">
            Email will be sent to you shortly (~appx 5 minutes) with a link to the result
            summary and improved dataset. You may navigate off the site at this time. Thank you!
          </div>
        </div>
      )}
      <div className="container">
        <form id="emailForm" onSubmit={(e) => submitHandler(e)}>
          <div className="mb-3">
            <input type="hidden" name="message"></input>
            <input type="hidden" name="to_name"></input>
            <input type="hidden" name="link"></input>
            {!configUpdateResult ? (
              <label htmlFor="inputEmail" className="form-label">
                Please enter the email address you would like to receive the
                improved dataset to.
              </label>
            ) : (
              ""
            )}

            <input
              name="user_email"
              type={!configUpdateSuccess ? "email" : "hidden"}
              className="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            {!configUpdateSuccess && (
              <div id="emailHelp" className="form-text">
                We&apos;ll never share your email with anyone else.
              </div>
            )}
          </div>
          {!configUpdateSuccess && (
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
