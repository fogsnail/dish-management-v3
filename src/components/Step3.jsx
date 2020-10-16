import React, { useState, useEffect } from "react";
import { data } from "../data/dishes";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const numberOfServingsCst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function Step3(props) {
  const [items, setItems] = useState([]);
  const [listDish, setListDish] = useState([]);
  const [dish, setDish] = useState("");
  const [numberOfServings, setNumberOfServings] = useState(1);

  useEffect(() => {
    var listDish = getDish();
    setListDish(listDish);
  }, []);

  function handleChange(event, type) {
    if (type === "dish") {
      setDish(event.target.value);
    }
    if (type === "numberOfServings") {
      setNumberOfServings(event.target.value);
    }
  }

  function getDish() {
    var mealSelected = props.mealCategory;
    var restaurantSelected = props.restaurant;
    // console.log(this.props);
    var restaurantsTemp = [];
    data.dishes.map((value) => {
      if (value.restaurant === restaurantSelected) restaurantsTemp.push(value);
    });
    var dish = [];
    restaurantsTemp.map((value) => {
      var index = value.availableMeals.indexOf(mealSelected);
      if (index !== -1) {
        dish.push(value.name);
      }
    });
    return dish;
  }

  function addItem() {
    if (dish) {
      if (items == null) {
        items = [];
      }
      var item = {};
      item.dish = dish;
      item.numberOfServings = numberOfServings;
      items.push(item);
      var listDishNew = listDish.filter((item) => item !== dish);
      setItems(items);
      setListDish(listDishNew);
      setDish(null);
      props.onUpdateStep3(items);
    } else {
      toast.warning("Please select a Dish !");
    }
  }
  return (
    <div>
      <div>
        <h1 style={{ marginLeft: "70%" }}>List</h1>
      </div>
      <Grid container spacing={2} className="App">
        <Grid item md={3} sm={6} xs={12}>
          <FormControl margin="dense" style={{ width: "300px" }}>
            <InputLabel htmlFor="my-input">Please Select a Dish</InputLabel>
            <Select onChange={(event) => handleChange(event, "dish")}>
              {listDish.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3} sm={6} xs={12}>
          <FormControl margin="dense" style={{ width: "300px" }}>
            <InputLabel htmlFor="my-input">
              Please enter no. of servings
            </InputLabel>
            <Select
              defaultValue={1}
              onChange={(event) => handleChange(event, "numberOfServings")}
            >
              {numberOfServingsCst.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            style={{ marginTop: "12px", marginLeft: "20px" }}
            variant="contained"
            color="primary"
            onClick={addItem}
          >
            Add
          </Button>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Table className="crud-table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "300px" }}>Dishes </TableCell>
                <TableCell>Number Of Servings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, index) => (
                <TableRow key={row.dish}>
                  <TableCell component="th" scope="row">
                    {row.dish}
                  </TableCell>
                  <TableCell>{row.numberOfServings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </div>
  );
}

export default Step3;
