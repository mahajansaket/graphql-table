import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";

export const client = new ApolloClient({
  uri: "https://welcome-peacock-97.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
