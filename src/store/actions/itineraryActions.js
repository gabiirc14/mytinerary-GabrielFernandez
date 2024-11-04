// src/store/actions/itineraryActions.js
export const GET_ITINERARIES_BY_CITY = "GET_ITINERARIES_BY_CITY";
export const SET_LOADING = "SET_LOADING";

export const getItinerariesByCity = (cityName) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SET_LOADING, payload: true });
            const response = await fetch(`http://localhost:8080/api/itineraries/city/${cityName}`);
            const data = await response.json();

            if (data.success) {
                dispatch({
                    type: GET_ITINERARIES_BY_CITY,
                    payload: data.response  
                });
            } else {
                dispatch({
                    type: GET_ITINERARIES_BY_CITY,
                    payload: []
                });
            }
        } catch (error) {
            console.error("Error fetching itineraries:", error);
            dispatch({
                type: GET_ITINERARIES_BY_CITY,
                payload: []
            });
        } finally {
            dispatch({ type: SET_LOADING, payload: false });
        }
    };
};