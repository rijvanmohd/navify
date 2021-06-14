import React, { useState, useEffect } from "react";
import { ReactComponent as Close } from "../icons/close.svg";
import data from "../../reason.json";

function EndClassForm({ onClose, onSubmit }) {
  const [reasons, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState();
  const [selectedSubReason, setSelectedSubReason] = useState();
  const [comment, setComment] = useState("");

  useEffect(() => {
    console.log(data);
    setReasons(data);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = data.find((each) => each.id === selectedReason);
    if (!res) {
      alert("Please Select Reason");
    } else if (res && res.sub_reason.length > 0 && !selectedSubReason) {
      alert("Please Select Reason");
    } else if (selectedSubReason === 7 && comment.trim().length === 0) {
      alert("Please Enter Other Reason");
    } else {
      console.log("submit");
      onSubmit();
    }
  };

  return (
    <div className=" text-sm md:w-full sm:w-1/2 md:text-base">
      <div className="px-5 md:px-10 py-5 flex flex-col form-select">
        {reasons.map((reason) => (
          <div>
            <label className="inline-flex items-center mt-3" key={reason.id}>
              <input
                type="checkbox"
                className="rounded-lg text-red-500"
                onChange={(e) => {
                  e.target.checked && setSelectedReason(reason.id);
                }}
                checked={reason.id === selectedReason}
              />
              <span className="ml-2 text-gray-700">{reason.reason}</span>
            </label>

            {reason.sub_reason.length > 0 && selectedReason === reason.id && (
              <div className="px-10 flex flex-col form-select ">
                {reason.sub_reason.map((sub_reason) => (
                  <label
                    className="inline-flex items-center mt-3"
                    key={sub_reason.id}
                  >
                    <input
                      type="checkbox"
                      className="rounded-lg text-red-500"
                      onChange={(e) => {
                        e.target.checked && setSelectedSubReason(sub_reason.id);
                      }}
                      checked={sub_reason.id === selectedSubReason}
                    />
                    <span className="ml-2 text-gray-700">
                      {sub_reason.reason}
                    </span>
                  </label>
                ))}
                {selectedSubReason === 7 && (
                  <textarea
                    className="resize-none border rounded-md mt-4"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    value={comment}
                  ></textarea>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-5 py-4 flex justify-start">
        <button
          className="bg-red-500 mr-1 rounded text-sm py-2 px-8 text-white hover:bg-red-600 transition duration-150"
          onClick={handleSubmit}
        >
          End Class
        </button>
        <button
          className="text-sm py-2 px-8 text-gray-500 hover:text-gray-600 transition duration-150"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EndClassForm;
