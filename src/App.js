
import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";


function Table() {
  const [data, setData] = useState([]);

useEffect(() => {
    (async () => {
      const totalCases = await axios(
        "https://corona.lmao.ninja/v2/countries"
      );
      setData(totalCases.data);
    })();
  }, []);

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
        columns={[
         
          { title: "Country", field: "country" },
          { title: "Today Cases", field: "todayCases", type: "numeric" },
          {
            title: "Today Deaths",
            field: "todayDeaths",
            type: "numeric",
          },
          {
            title: "Total Deaths",
            field: "deaths",
            type: "numeric",
          },
          {
            title: "Total Cases",
            field: "cases",
            type: "numeric",
          },
        ]}
        data={data}
        defaultPageSize={50}
      />
    </div>
  );
}

export default Table;
