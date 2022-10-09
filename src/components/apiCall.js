import React, { useEffect, useState } from "react";

const path = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=8ae55d463e1bf8d38b4a502ca47512f9b1dec21533ad9af7acb993e8ba952bc2"

const useAPIService = () => {

    //Variable for saving the api call result
    const [result, setResult] = useState({
        status: "loading",
        data: []
    });

    //https://stackoverflow.com/questions/48774535/js-fetch-api-get-method-return-%C6%92-json-native-code
    //Makes the API call to the path
    useEffect(() => {
        const fetchContent = () => {
            fetch(path, {
                method: "GET",
                headers: new Headers({
                    "Authorization" : "Basic",
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                })
            })
            .then(response => {
                response.json()
                .then(data => {
                    setResult({
                        status: "loaded",
                        data: data
                    })
                })
            })
            .catch(error => {
                throw new Error()
            })
           
        };
        fetchContent();

    }, [])
    return result;

} 
export default useAPIService;
