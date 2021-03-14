import { session, signIn, signOut, useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import moment from "moment";

export default function Home({ apidata }) {
  const [session, loading] = useSession();
  const [userInput, setUserInput] = useState("");

  const [mydata, setmydata] = useState(null);

  useEffect(async () => {
    const response = await fetch(
      "https://next-js-try-bipin.herokuapp.com/posts/"
    );
    const data = await response.json();
    setmydata(data);
  });

  if (!mydata) return <div className="text-5xl">loading...</div>;

  const handlesubmit = async (event) => {
    setUserInput("");
    event.preventDefault();

    const dataT = { name: "", body: "", createdAt: "" };
    dataT.name = session.user.name;
    dataT.body = userInput;
    dataT.createdAt = new Date().toString();
    console.log(dataT.createdAt);

    fetch("https://next-js-try-bipin.herokuapp.com/addpost", {
      method: "POST", // or 'PUT',

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataT),
    })
      .then((response) => response.json())
      .then((dataT) => {
        console.log("Success:", dataT);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  return (
    <>
      {!session && (
        <>
          <div>
            You are not signed in to see this home page
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        </>
      )}

      {session && (
        <>
          <div className="container mx-auto w-7/12  ">
            <div className="text-5xl text-center my-5 font-medium">
              {" "}
              Welcome <span className="text-blue-400">{session.user.name}</span>
            </div>
            <div className="text-center my-8">
              <form onSubmit={handlesubmit}>
                <input
                  className="w-9/12 h-10"
                  value={userInput}
                  type="text"
                  onChange={handleChange}
                  placeholder="Whats on your mind"
                />
              </form>
            </div>

            <button
              className="bg-blue-400 my-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
            {mydata
              .slice(0)
              .reverse()
              .map((item) => (
                <div
                  className="text-center border border-blue-200 space-y-4 rounded-2xl hover:border-blue-700"
                  id={item.body}
                >
                  <div className="text-3xl text-blue-500 text-left">
                    {item.name}
                  </div>
                  <div className="text-left text-sm">
                    {moment(item.createdAt).startOf("second").fromNow()}
                  </div>
                  <div className="text-3xl"> {item.body} </div>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}
