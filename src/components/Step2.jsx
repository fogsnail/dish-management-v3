import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { data } from "../data/dishes";

function Step2(props) {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(props.listSelected.restaurant);
  }, []);

  useEffect(() => {
    var dataStep2 = {};
    dataStep2.restaurant = restaurant;
    props.onUpdateStep2(dataStep2);
  }, [restaurant]);

  function handleChange(event) {
    setRestaurant(event.target.value);
  }

  function getRestaurantsByMealCategory() {
    var mealSelected = props.mealCategory;
    var restaurantsTemp = [];
    data.dishes.map((value) => {
      var index1 = value.availableMeals.indexOf(mealSelected);
      if (index1 !== -1) {
        restaurantsTemp.push(value.restaurant);
      }
    });
    var restaurant = [];
    restaurantsTemp.map((value) => {
      var index2 = restaurant.indexOf(value);
      if (index2 === -1) {
        restaurant.push(value);
      }
    });
    return restaurant;
  }

  return (
    <div>
      <h1>
        <br />
      </h1>
      <Grid container spacing={2}>
        <Grid item md={3} sm={6} xs={12} className="ml-16 App">
          <FormControl margin="dense" style={{ width: "300px" }}>
            <InputLabel htmlFor="my-input">
              Please Select Restaurants
            </InputLabel>
            <Select
              defaultValue={props.restaurant}
              onChange={(event) => handleChange(event)}
            >
              {getRestaurantsByMealCategory().map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
export default Step2;
