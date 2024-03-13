import React from "react";
// import { RouterProvider } from "react-router-dom";
// import router from "./routes";
import Transfer from "./modules/home/views/Transfer";
import Transactions from "./modules/home/views/Transactions";

function App() {
  const [page, setPage] = React.useState("false");
  return (
    <React.Fragment>
      {page === "transfer" ? (
        <Transfer
          onChange={(values) => {
            setPage(values);
          }}
        />
      ) : (
        <Transactions
          onChange={(values) => {
            setPage(values);
          }}
        />
      )}

      {/* <RouterProvider router={router} /> */}
    </React.Fragment>
  );
}

export default App;
