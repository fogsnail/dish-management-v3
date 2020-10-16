import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { actShowOrder } from "../actions/index";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
const steps = ["Step 1", "Step 2", "Step 3", "Review"];

function Steppers(props) {
  const [mealCategory, setMealCategory] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  var order = {
    mealCategory: mealCategory,
    numberOfPeople: numberOfPeople,
    restaurant: restaurant,
    activeStep: activeStep,
    items: [...items],
  };

  useEffect(() => {
    var selectedOder = actShowOrder(order);
    dispatch(selectedOder);
  }, [order]);

  function handleBack() {
    var { history, match, location } = props;
    history.goBack();
  }

  function validator() {
    var { history, match, location } = props;
    if (location.pathname === `${match.url}/step1`) {
      if (!mealCategory) {
        toast.warning("Please select Meal Category!");
        return 0;
      }
    }
    if (location.pathname === `${match.url}/step1`) {
      if (!numberOfPeople) {
        toast.warning("Please select Number Of People !");
        return 0;
      }
    }
    if (location.pathname === `${match.url}/step2`) {
      if (restaurant == "") {
        toast.warning("Please select Restaurant !");
        return 0;
      }
    }
    if (location.pathname === `${match.url}/step3`) {
      if (items == "") {
        items = [];
      }
      var total = 0;
      items.map((value) => {
        total += value.numberOfServings;
      });
      if (numberOfPeople > total) {
        toast.warning("Please add Dish or Servings!");
        return 0;
      }
      return 1;
    }
    return 1;
  }

  function handleNext() {
    var { history, match, location } = props;
    var stepUrl = "/";
    var result = validator();
    if (result === 1) {
      if (location.pathname === `${match.url}`) {
        stepUrl = "/step1";
      } else if (location.pathname === `${match.url}/step1`) {
        stepUrl = "/step2";
      } else if (location.pathname === `${match.url}/step2`) {
        stepUrl = "/step3";
      } else if (location.pathname === `${match.url}/step3`) {
        stepUrl = "/review";
      }
      history.push(`${match.url}${stepUrl}`);
    }
  }

  function handleReset() {
    var { history } = props;
    history.push("/dish-management/step1");
    setActiveStep(0);
    setMealCategory("");
    setNumberOfPeople("");
    setRestaurant("");
    setActiveStep("");
    setItems([]);
  }

  function checkStep(activeStep) {
    // var { activeStep } = this.state;
    console.log(activeStep);
    switch (activeStep) {
      case 0:
        return "Select meal category and number of people";
      case 1:
        return "Select Restaurants";
      case 2:
        return "Select Dish and Servings";
      case 3:
        return "Over view";
      default:
        return "Over view";
    }
  }

  function onUpdateStep1(data) {
    setMealCategory(data.mealCategory);
    setNumberOfPeople(data.numberOfPeople);
  }

  function onUpdateStep2(data) {
    setRestaurant(data.restaurant);
  }

  function onUpdateStep3(data) {
    setItems(data);
  }

  var { history, match, location } = props;
  // console.log(location.pathname);
  console.log("renderrrrrrrrrrrrrrrrrrrrrrr");

  function showActiveStep() {
    var activeStep = 0;
    if (location.pathname == "/dish-management/step1") {
      activeStep = 0;
    } else if (location.pathname == "/dish-management/step2") {
      activeStep = 1;
    } else if (location.pathname == "/dish-management/step3") {
      activeStep = 2;
    } else if (location.pathname == "/dish-management/review") {
      activeStep = 3;
    }
    return activeStep;
  }

  return (
    <div className="app">
      <div className="Steppers">
        <Stepper activeStep={showActiveStep()} alternativeLabel>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {showActiveStep() === steps.length - 1 ? (
            <div>
              <Button
                disabled={showActiveStep() === 0}
                onClick={() => handleBack()}
              >
                Back
              </Button>
              <Button
                onClick={() => handleReset()}
                variant="contained"
                color="primary"
              >
                Finish
              </Button>
            </div>
          ) : (
            <div>
              <h1>
                <Typography align="center" variant="h5" color="primary">
                  {checkStep(activeStep)}
                </Typography>
              </h1>

              <div>
                <Button
                  disabled={showActiveStep() === 0}
                  onClick={() => handleBack()}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext()}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="container">
        <Switch>
          <Route
            path="/dish-management/step1"
            render={() => (
              <Step1
                onUpdateStep1={(data) => onUpdateStep1(data)}
                listSelected={order}
              />
            )}
          />

          <Route
            path="/dish-management/step2"
            render={() => (
              <Step2
                onUpdateStep2={(data) => onUpdateStep2(data)}
                mealCategory={mealCategory}
                restaurant={restaurant}
                listSelected={order}
              />
            )}
          />

          <Route
            path="/dish-management/step3"
            render={() => (
              <Step3
                onUpdateStep3={(data) => onUpdateStep3(data)}
                mealCategory={mealCategory}
                restaurant={restaurant}
                listSelected={order}
              />
            )}
          />
          <Route path="/dish-management/review" component={Step4} />
        </Switch>
      </div>
    </div>
  );
}
const mapStateToProps = null;
export default Steppers;
