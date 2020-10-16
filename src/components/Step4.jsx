import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { useSelector } from "react-redux";

function Step4() {
  const listSelected = useSelector((state) => state.oder);

  return (
    <div>
      <h1>Over view</h1>
      <Grid container spacing={2} className="App">
        <Grid item md={12} sm={12} xs={12}>
          <Table
            border={0}
            className="crud-table"
            style={{
              //   whiteSpace: "pre",
              width: "50%",
              margin: "auto",
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Meal
                </TableCell>
                <TableCell>{listSelected.mealCategory}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Number Of People
                </TableCell>
                <TableCell> {listSelected.numberOfPeople}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Restaurant
                </TableCell>
                <TableCell>{listSelected.restaurant}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Dishes
                </TableCell>
                <TableCell>
                  {listSelected.items.map((row, index) => (
                    <TableRow
                      key={row.dish}
                      style={{ border: "2px solid #3f51b5" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.dish}
                      </TableCell>
                      <TableCell>{row.numberOfServings}</TableCell>
                    </TableRow>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </div>
  );
}

export default Step4;
