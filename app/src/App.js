import React from "react";
import { connect } from "react-redux";
import axios from "axios";

const App = (props) => {
  return (
    <div className="center">
      <header className="title">Dad Jokes, yeehaw!!!</header>

      {props.isLoading ? (
        <p className="text">Loading...</p>
      ) : (
        <p className="text">{props.dadJoke}</p>
      )}

      <button
        onClick={() => {
          props.fetchDadJokeFromApi();
        }}
        // className="bg-white hover:bg-gray-300 px-4 py-2 rounded-lg mt-5 font-bold"
        className="button"
      >
        Get new Joke
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dadJoke: state.dadJoke,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Dispatch a regular action
    // changeDadJoke: (newDadJoke) => {
    //   dispatch({
    //     type: "CHANGE_DAD_JOKE",
    //     payload: newDadJoke,
    //   });
    // },

    fetchDadJokeFromApi: () => {
      // Dispatch a FUNCTION
      dispatch(() => {
        dispatch({
          type: "FETCH_DAD_JOKE_PENDING",
        });
        axios({
          method: "GET",
          url: "https://icanhazdadjoke.com",
          headers: {
            Accept: "application/json",
          },
        })
          // axios.get("https://icanhazdadjoke.com")
          .then((response) => {
            dispatch({
              type: "FETCH_DAD_JOKE_SUCCESS",
              payload: response.data.joke,
            });
          })
          .catch(() => {
            dispatch({
              type: "FETCH_DAD_JOKE_ERROR",
              payload: "Sth wrong happened. Please contact support!",
            });
          });
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
