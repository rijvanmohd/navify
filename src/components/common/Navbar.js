import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import { ReactComponent as Logo } from "../icons/logo.svg";
import { ReactComponent as Menu } from "../icons/hamburger.svg";
import { ReactComponent as Close } from "../icons/close.svg";
import EndClassForm from "./EndClassForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "fit-content",
    width: "fit-content",
    transform: "translate(-50%, -50%)",
  },
};

function Navbar({ title, time, counter }) {
  const [clock, setClock] = useState(time);
  const [stop, setStop] = useState(false);
  const [open, setOpen] = useState(false);
  const [endRequest, setEndRequest] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const ref = useRef();
  const history = useHistory();

  const setTimer = () => {
    const [min, sec] = clock.split(":").map((a) => Number(a));
    let duration = min * 60 + sec;
    let minutes, seconds;
    let displayTime = minutes + ":" + seconds;
    ref.current = setInterval(() => {
      minutes = parseInt(duration / 60, 10);
      seconds = parseInt(duration % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      displayTime = minutes + ":" + seconds;
      //   console.log(displayTime);
      setClock((time) => displayTime);
      if (duration === 0) {
        setStop(true);
      }
      duration -= 1;
    }, 1000);
  };

  const handleClassEnd = () => {
    setEndRequest((prev) => !prev);
  };

  const onClose = () => {
    setEndRequest((prev) => !prev);
  };

  const onSubmit = () => {
    setEndRequest((prev) => !prev);
    setStop((prev) => !prev);
  };

  const handleRedirect = () => {
    history.push("/posts");
  };

  useEffect(() => {
    setTimer();
    return () => clearInterval(ref.current);
  }, []);

  useEffect(() => {
    if (stop) {
      console.log("clearing interval");
      clearInterval(ref.current);
    }
  }, [stop, ref]);

  useEffect(() => {
    console.log("open", open);
  }, [open]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
        <div
          x-data="{ open: false }"
          className="flex flex-col py-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        >
          <div className="flex flex-row items-center justify-between">
            <Logo className="flex-none w-40 pl-4 sm:pl-6 xl:pl-8 flex items-center lg:w-40 xl:w-50" />
            <div className="pl-4 xl:visible md:visible invisible">{title}</div>

            <button
              className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
              onClick={(e) => {
                setOpen((prev) => !prev);
              }}
            >
              {open ? (
                <Close className="w-6 h-6 mx-4" />
              ) : (
                <Menu className="w-6 h-6 mx-4" />
              )}
            </button>
          </div>

          <nav className="flex-col flex-grow pb-4 items-center md:pb-0 hidden md:flex md:justify-end md:flex-row">
            <button
              className="px-4 py-2 font-semibold rounded-sm bg-red-500  text-white  disabled:opacity-50 focus:shadow-outline"
              onClick={handleRedirect}
            >
              Check Posts
            </button>
            <div className="align-middle font-semibold text-center px-4">
              {stop ? "Class Ended" : clock}
            </div>
            <button
              className="px-4 py-2 font-semibold rounded-sm bg-red-500  text-white  disabled:opacity-50 focus:shadow-outline"
              onClick={handleClassEnd}
              disabled={stop}
            >
              End Class
            </button>
          </nav>

          {open && (
            <div className="absolute right-0 w-full mt-12 origin-top-right rounded-md shadow-lg md:w-48">
              <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
                <div className="px-4 py-2 text-sm font-semibold text-center">
                  {title}
                </div>
                <div className="px-4 py-2 align-middle font-semibold text-center px-4">
                  {stop ? "Class Ended" : clock}
                </div>
                <div className="px-4 py-2 items-center text-center">
                  <button
                    className="px-4 py-2 font-semibold rounded-sm bg-red-500 text-white  disabled:opacity-50 focus:shadow-outline"
                    onClick={handleClassEnd}
                    disabled={stop}
                  >
                    End Class
                  </button>
                </div>
                <div className="px-4 py-2 items-center text-center">
                  <button
                    className="px-4 py-2 font-semibold rounded-sm bg-red-500 text-white  disabled:opacity-50 focus:shadow-outline"
                    onClick={handleRedirect}
                  >
                    Check Posts
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {endRequest && (
        <Modal
          isOpen={endRequest}
          //   onAfterOpen={afterOpenModal}
          onRequestClose={onClose}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex justify-between border-b border-gray-100 px-5 py-4 text-sm md:text-base">
            <div>
              <i className="fa fa-exclamation-triangle text-orange-500"></i>
              <span className="font-bold text-gray-700 text-lg">
                Select a reason to end class
              </span>
            </div>
            <div>
              <button>
                <Close
                  className="w-6 h-6 mx-4 hover:text-red-600 transition duration-150"
                  onClick={onClose}
                />
              </button>
            </div>
          </div>
          <EndClassForm onClose={onClose} onSubmit={onSubmit} />
        </Modal>
      )}
    </div>
  );
}

export default Navbar;
