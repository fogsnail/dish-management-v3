import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
const meal = ["breakfast", "dinner", "lunch"];
const numberPeople = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Step1(props) {
  const [mealCategory, setMealCategory] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(null);
  useEffect(() => {
    setMealCategory(props.listSelected.mealCategory);
    setNumberOfPeople(props.listSelected.numberOfPeople);
  }, []);

  useEffect(() => {
    var dataStep1 = {};
    dataStep1.mealCategory = mealCategory;
    dataStep1.numberOfPeople = numberOfPeople;
    props.onUpdateStep1(dataStep1);
  }, [mealCategory]);

  useEffect(() => {
    var dataStep1 = {};
    dataStep1.mealCategory = mealCategory;
    dataStep1.numberOfPeople = numberOfPeople;
    props.onUpdateStep1(dataStep1);
  }, [numberOfPeople]);

  function handleChange(event, type) {
    if (type === "meal") {
      setMealCategory(event.target.value);
    }
    if (type === "numberOfPeople") {
      setNumberOfPeople(event.target.value);
    }
  }

  return (
    <div>
      <h1>
        <br />
      </h1>
      <Grid container spacing={1} className="App">
        <Grid item md={3} sm={6} xs={12} className="ml-16">
          <FormControl margin="dense" style={{ width: "300px" }}>
            <InputLabel htmlFor="my-input">Please Select a Meal</InputLabel>
            <Select
              defaultValue={props.listSelected.mealCategory}
              onChange={(event) => handleChange(event, "meal")}
            >
              {meal.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3} sm={6} xs={12} className="ml-16">
          <FormControl margin="dense" style={{ width: "300px" }}>
            <InputLabel htmlFor="my-input">
              Please Select number of People
            </InputLabel>
            <Select
              defaultValue={props.listSelected.numberOfPeople}
              onChange={(event) => handleChange(event, "numberOfPeople")}
            >
              {numberPeople.map((item) => {
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

export default Step1;
