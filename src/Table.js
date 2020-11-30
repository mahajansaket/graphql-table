import React, {useState} from "react";
import { useQuery, gql } from "@apollo/client";
import MaterialTable from "material-table";
import { client } from "./index";
// import { GET_URL } from "./Graphql";

const tableColumnConfig = [
  {
    title: "ID",
    field: "id",
  },
  {
    title: "URL",
    field: "url",
  },
  {
    title: "Tiny URL",
    field: "tinyurl",
  },
];

const GET_URL = gql`
  {
    url_shortener {
      id
      created_at
      tinyurl
      url
    }
  }
`;

function Table() {
  const [data, setData] = useState([]);

  const remoteData = (query) => {
    console.log("Query object - ", query);
    return client
      .query({
        query: GET_URL,
      })
      .then((res) => {
        console.log("res", res);
        return {
          data: res.data.url_shortener,
        };
      });
  };
  
  console.log(remoteData);

  return (
    <div>
       <MaterialTable
        title="COVID 19 Country Updates"
         style={{
          backgroundColor: "transparent",
          borderColor: "#039be5",
          color: "#6cacc5",
        }}
        options={{
          headerStyle: {
            backgroundColor: "transparent",
            color: "#6cacc5",
            borderColor: "#039be5",
          },
          pageSize: 10,
          toolbar: true,
        }}
        columns={tableColumnConfig}
        data={remoteData}
        defaultPageSize={50}
      />
    </div>
  );
}

export default Table;
