import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "", id: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getpasswords = async () => {
    try {
      const req = await fetch("http://localhost:3000/");
      const password = await req.json();
      setPasswordArray(password);
    } catch (error) {
      console.error("Failed to load passwords:", error);
    }
  };
  useEffect(() => {
    getpasswords();  
  }, []);

  const [showPass, setShowPass] = useState(false);
  const showPassword = () => {
    setShowPass(!showPass);
  };
  const savePassword = async () => {
    if (
      form.username.length > 3 &&
      form.password.length > 3 &&
      form.site.length > 3
    ) {
      const newPassword = { ...form, id: form.id || uuidv4() };

      if (form.id) {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
      }

      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });

      if (!response.ok) {
        toast("Error saving password");
        return;
      }

      await getpasswords();
      setform({ site: "", username: "", password: "", id: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast("Error: Password not saved");
    }
  };

  const deletePassword = async (id) => {
    console.log("delete password id:", id);
    let c = confirm("Do you realy want to DELETE?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      


      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

      toast("Password deleted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const editPassword = (id) => {
    

    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied Successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5  [background:radial-gradient(145%_125%_at_50%_5%,#005_30%,#63e_100%)]"></div>
      <div className="border-b-blue-950 border-2 m-4 ">
        <h1 className="text-amber-50 text-2xl font-bold text-center">iPass</h1>
        <h3 className="text-amber-50 text-sl  text-center">
          Your password manager
        </h3>

        <div className="flex flex-col items-center justify-centers p-2">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter website url"
            className="bg-blue-300 border-amber-300 p-4 mt-5 h-10 w-1/4 text-black rounded-full  border-2"
            type="text"
            name="site"
            id="site"
          />
          <div className=" my-10 justify-center flex gap-5">
            <div>
              <input
                onChange={handleChange}
                value={form.username}
                placeholder="Enter username"
                className="bg-blue-300 border-amber-300 p-4 h-10 w-full  text-black rounded-full  border-2"
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div className="relative flex ">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter password"
                className="bg-blue-300 border-amber-300 p-4 h-10 w-full text-black rounded-full border-2"
                type={showPass ? "text" : "password"}
                name="password"
                id="password  "
              />
              <span
                onClick={showPassword}
                className="absolute cursor-pointer  right-3 top-3 "
              >
                <img
                  width={25}
                  src={showPass ? "eyecross.svg" : "eye.svg"}
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="cursor-pointer bg-blue-400 text-white border-2 w-fit rounded-full p-4 flex gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="injected-svg"
              data-src="https://cdn.hugeicons.com/icons/add-square-stroke-rounded.svg?v=1.0.0"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              role="img"
              color="currentColor"
            >
              <path
                d="M2.5 12.0001C2.5 7.52171 2.5 5.28254 3.89124 3.8913C5.28249 2.50005 7.52166 2.50005 12 2.50005C16.4783 2.50005 18.7175 2.50005 20.1088 3.8913C21.5 5.28254 21.5 7.52171 21.5 12.0001C21.5 16.4784 21.5 18.7176 20.1088 20.1088C18.7175 21.5001 16.4783 21.5001 12 21.5001C7.52166 21.5001 5.28249 21.5001 3.89124 20.1088C2.5 18.7176 2.5 16.4784 2.5 12.0001Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M12 8.00005V16.0001M16 12.0001L8 12.0001"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Add Password
          </button>
        </div>

        <div className="passWord w-full p-9 bg-cyan-300  border-amber-50 border-2">
          <h1 className="font-bold text-2xl py-4 m-2">Your Passwords</h1>
          {passwordArray.length === 0 && (
            <span className="border-red-900 border-2 rounded-xl p-5 font-bold text-cyan-100 bg-cyan-600 ">
              NO PASSWORDS TO SHOW
            </span>
          )}
          {passwordArray.length != 0 && (
            <table class="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 border-amber-100 border-2">Site</th>
                  <th className="py-2 border-amber-100 border-2">User Name</th>
                  <th className="py-2 border-amber-100 border-2">Password</th>
                  <th className="py-2 border-amber-100 border-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-blue-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className=" text-center py-2 border border-amber-50 w-32">
                      <div className="flex justify-between items-center px-5">
                        <span>
                          <a
                            href={
                              item.site.startsWith("http://") ||
                              item.site.startsWith("https://")
                                ? item.site
                                : `https://${item.site}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.site}
                          </a>
                        </span>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="injected-svg"
                            data-src="https://cdn.hugeicons.com/icons/copy-stroke-rounded.svg?v=1.0.0"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            role="img"
                            color="#000000"
                          >
                            <path
                              d="M7 11V9C7 5.70017 7 4.05025 8.02513 3.02513C9.05025 2 10.7002 2 14 2C17.2998 2 18.9497 2 19.9749 3.02513C21 4.05025 21 5.70017 21 9V11C21 14.2998 21 15.9497 19.9749 16.9749C18.9497 18 17.2998 18 14 18C10.7002 18 9.05025 18 8.02513 16.9749C7 15.9497 7 14.2998 7 11Z"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M3 6V15C3 18.2998 3 19.9497 4.02513 20.9749C5.05025 22 6.70017 22 10 22H17"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-2 border border-amber-50 w-32">
                      <div className="flex justify-between items-center px-5">
                        <span>{item.username}</span>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="injected-svg"
                            data-src="https://cdn.hugeicons.com/icons/copy-stroke-rounded.svg?v=1.0.0"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            role="img"
                            color="#000000"
                          >
                            <path
                              d="M7 11V9C7 5.70017 7 4.05025 8.02513 3.02513C9.05025 2 10.7002 2 14 2C17.2998 2 18.9497 2 19.9749 3.02513C21 4.05025 21 5.70017 21 9V11C21 14.2998 21 15.9497 19.9749 16.9749C18.9497 18 17.2998 18 14 18C10.7002 18 9.05025 18 8.02513 16.9749C7 15.9497 7 14.2998 7 11Z"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M3 6V15C3 18.2998 3 19.9497 4.02513 20.9749C5.05025 22 6.70017 22 10 22H17"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-2 border border-amber-50 w-32">
                      <div className="flex justify-between items-center px-5">
                        <span>{"*".repeat(item.password.length)}</span>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="injected-svg"
                            data-src="https://cdn.hugeicons.com/icons/copy-stroke-rounded.svg?v=1.0.0"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            role="img"
                            color="#000000"
                          >
                            <path
                              d="M7 11V9C7 5.70017 7 4.05025 8.02513 3.02513C9.05025 2 10.7002 2 14 2C17.2998 2 18.9497 2 19.9749 3.02513C21 4.05025 21 5.70017 21 9V11C21 14.2998 21 15.9497 19.9749 16.9749C18.9497 18 17.2998 18 14 18C10.7002 18 9.05025 18 8.02513 16.9749C7 15.9497 7 14.2998 7 11Z"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M3 6V15C3 18.2998 3 19.9497 4.02513 20.9749C5.05025 22 6.70017 22 10 22H17"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </td>
                    <td className=" text-center justify-center py-2 border border-amber-50 w-32">
                      <div className=" flex justify-center items-center gap-4">
                        <span
                          className="mx-2 cursor-pointer"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="injected-svg"
                            data-src="https://cdn.hugeicons.com/icons/edit-04-stroke-rounded.svg?v=1.0.0"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            role="img"
                            color="#000000"
                          >
                            <path
                              d="M8.17151 19.8284L19.8284 8.17157C20.3736 7.62632 20.6462 7.3537 20.792 7.0596C21.0693 6.50005 21.0693 5.8431 20.792 5.28354C20.6462 4.98945 20.3736 4.71682 19.8284 4.17157C19.2831 3.62632 19.0105 3.3537 18.7164 3.20796C18.1568 2.93068 17.4999 2.93068 16.9403 3.20796C16.6462 3.3537 16.3736 3.62632 15.8284 4.17157L4.17151 15.8284C3.59345 16.4064 3.30442 16.6955 3.15218 17.063C2.99994 17.4305 2.99994 17.8393 2.99994 18.6568V20.9999H5.34308C6.16059 20.9999 6.56934 20.9999 6.93688 20.8477C7.30442 20.6955 7.59345 20.4064 8.17151 19.8284Z"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M12 21H18"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M14.5 5.5L18.5 9.5"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <span
                          className="mx-2 cursor-pointer "
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="injected-svg"
                            data-src="https://cdn.hugeicons.com/icons/delete-02-stroke-rounded.svg?v=1.0.0"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            role="img"
                            color="#000000"
                          >
                            <path
                              d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            ></path>
                            <path
                              d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            ></path>
                            <path
                              d="M9.5 16.5L9.5 10.5"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            ></path>
                            <path
                              d="M14.5 16.5L14.5 10.5"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
