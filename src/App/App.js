import { useState, useEffect, useReducer } from "react";
import { Email } from "Email";

import "./App.css";

const { EMAIL_PORT = 3001 } = process.env;

const refreshReducer = (prev, next) => (isNaN(next) || !next ? prev : next);

export const App = () => {
  const [showRaw, setShowRaw] = useState();
  const [refresh, setRefresh] = useState(0);
  const [refreshRate, setRefreshRate] = useReducer(refreshReducer, 60);
  const [varValue, setVarValue] = useState("");

  useEffect(() => {
    const interval = setInterval(
      () => setRefresh((r) => r + 1),
      1000 * refreshRate
    );
    return () => clearInterval(interval);
  }, [refreshRate]);

  return (
    <div id="App">
      <h1>Email Generator!</h1>
      <div>
        {Email ? (
          <div>
            <div>
              <div>
                Refresh Interval (sec):{" "}
                <input
                  value={refreshRate}
                  onChange={({ target: { value } }) => setRefreshRate(value)}
                />
              </div>
              <div>
                Variable Value:{" "}
                <input
                  value={varValue}
                  onChange={({ target: { value } }) => setVarValue(value)}
                />
              </div>
            </div>
            <div>
              <div>
                <button disabled={!showRaw} onClick={() => setShowRaw()}>
                  Show Preview
                </button>
                <button disabled={!!showRaw} onClick={() => setShowRaw(true)}>
                  Show Raw HTML
                </button>
              </div>
              {!showRaw ? (
                <iframe
                  className="previewFrame"
                  title="Generated Email"
                  src={`http://localhost:${EMAIL_PORT}?r=${refresh}&var=${varValue}`}
                />
              ) : (
                <code>{Email.replaceAll("%%var%%", varValue)}</code>
              )}
            </div>
          </div>
        ) : (
          <>
            No email generated. Run{" "}
            <code className="exampleCode">npm run email</code>
            &nbsp;to generate one, then refresh.
          </>
        )}
      </div>
    </div>
  );
};
