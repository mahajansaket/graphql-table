import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, gql } from "@apollo/client";
import MaterialTable from "material-table";
import AppBar from "@material-ui/core/AppBar";
import { client } from "./index";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { GitHub, Language } from "@material-ui/icons/";
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Table() {
  const [data, setData] = useState([]);
  const classes = useStyles();

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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            URL Shortener
          </Typography>
          <IconButton
            edge="end"
            aria-label="web link"
            aria-haspopup="true"
            color="inherit"
            onClick={(event) =>
              window.open(" https://dry-cliffs-70230.herokuapp.com", "_blank")
            }
          >
            <Language />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="github link"
            aria-haspopup="true"
            color="inherit"
            onClick={(event) =>
              window.open(
                "https://github.com/mahajansaket/graphql-table",
                "_blank"
              )
            }
          >
            <GitHub />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MaterialTable
        title="URL Shortener"
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
