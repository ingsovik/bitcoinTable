
const unixTime = (unixTime) => {
    //https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
    //https://www.tutorialrepublic.com/faq/how-to-convert-a-unix-timestamp-to-time-in-javascript.php
    //Converts unixtimestamp to readable string

    let date = new Date(unixTime * 1000)
    return date.toLocaleDateString("en-GB");
    
}

export default unixTime;