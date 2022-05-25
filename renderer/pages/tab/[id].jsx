import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import electron from "electron";

const ipcRenderer = electron.ipcRenderer || false;

function Tab() {
  const router = useRouter();
  const { id } = router.query;

  // const [message, setMessage] = React.useState("");
  const [messageName, setMessageName] = React.useState("");

  React.useEffect(() => {
    // like componentDidMount()
    const tmpMessage = ipcRenderer.sendSync("get-message", id);
    // setMessage(tmpMessage);
    setMessageName(tmpMessage.name);

    return () => {
      // like componentWillUnmount()
    };
  }, []);

  const onChange = (e) => setMessageName(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();

    ipcRenderer.send("edit-message", { id, messageName });
    console.log("ran onsubmit");
  };

  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-javascript-tailwindcss)</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <img className="ml-auto mr-auto" src="/images/logo.png" />
        <span>
          ⚡ name: {messageName} - index: {id} ⚡
        </span>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/home">
          <a className="btn-blue">Go to home page</a>
        </Link>
      </div>

      <div className="bg-gray-900 text-white">
        <h3>Edit Name</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="text-gray-800 p-2"
            value={messageName}
            onChange={onChange}
          />
        </form>
      </div>
    </React.Fragment>
  );
}

export default Tab;
