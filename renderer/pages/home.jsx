import electron from "electron";
import React from "react";
import Head from "next/head";
import Link from "next/link";

const ipcRenderer = electron.ipcRenderer || false;

function Home() {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    // like componentDidMount()
    setMessages(ipcRenderer.sendSync("get-messages"));

    return () => {
      // like componentWillUnmount()
    };
  }, []);

  // const onChange = (e) => setMessage(e.target.value);

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   ipcRenderer.send("add-message", message);
  //   setMessages([...messages, message]);
  //   setMessage("");
  // };

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-tailwindcss)</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <img className="ml-auto mr-auto" src="/images/logo.png" />
        <span>⚡ Electrons ⚡</span>
        <span>+</span>
        <span>Next.js</span>
        <span>+</span>
        <span>tailwindcss</span>
        <span>=</span>
        <span>💕 </span>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        {/* <Link href="/next">
          <a className="btn-blue">Go to next page</a>
        </Link> */}

        {messages.map((message, index) => (
          <Link href={"/tab/" + index} key={index}>
            <a className="btn-blue">{message.name}</a>
          </Link>
        ))}
      </div>

      {/* <div className="bg-gray-900 text-white">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="text-gray-800 p-2"
            value={message}
            onChange={onChange}
          />
        </form>
        <ul>
          {messages.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div> */}
    </React.Fragment>
  );
}

export default Home;
