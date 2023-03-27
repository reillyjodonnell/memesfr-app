// To sync server time with client for notification and message time differnences:

// SOLUTION 1
/*


fetch the server time once when the user starts the application or loads the page, and then use the client's local time to keep track of the elapsed time.

Here's how you can implement this:

Fetch the server's current time:
Create an API endpoint on your server that returns the server's current time. Your client application will call this API to retrieve the server's time when it first loads.

Calculate the time offset:
On the client-side, fetch the server's current time and calculate the difference between the server's current time and the client's local time. This will give you a time offset value.

Calculate the time difference:
When you want to show how long ago a message was sent, use the client's local time and the stored time offset to calculate the server's time. Then, find the difference between the server's time and the timestamp of the sent message.

Here's a basic example using JavaScript:

javascript
Copy code
let timeOffset;

// Fetch the server's current time and calculate the time offset
async function fetchServerTimeAndCalculateOffset() {
  const response = await fetch("https://yourserver.com/api/current-time");
  const serverTime = await response.json();
  const clientTime = new Date().getTime();
  timeOffset = serverTime - clientTime;
}

// Call this function when the app starts or the page loads
fetchServerTimeAndCalculateOffset();

// Calculate the time difference
function timeDifference(messageTimestamp) {
  const currentClientTime = new Date().getTime();
  const currentServerTime = currentClientTime + timeOffset;
  const timeElapsed = currentServerTime - messageTimestamp;

  // Format the time difference as needed (e.g., into minutes, hours, days, etc.)
}
Keep in mind that this approach assumes that the client's clock doesn't drift significantly during the time the application is running. If the client's clock drifts, the time difference may become inaccurate. You can periodically fetch the server time and update the time offset to mitigate this issue.


*/

//SOLUTION 2
/*
A better solution could be to use the Network Time Protocol (NTP) or Simple Network Time Protocol (SNTP) libraries to synchronize the client's clock with a time server. By synchronizing the client's clock, you can reduce the impact of time drift and ensure more accurate time calculations.

Here's a high-level overview of the steps to implement this approach:

Choose an NTP or SNTP library:
For JavaScript, you can use libraries like @destinationstransfers/ntp or sntp. You can find similar libraries for other languages as well.

Configure the NTP or SNTP client:
Set up the NTP or SNTP client to use a public time server or your own server. The client will periodically synchronize its time with the time server.

Calculate the time difference:
When you want to show how long ago a message was sent, use the synchronized client time to calculate the time difference between the message's timestamp and the current time.

Here's a basic example using the sntp library in JavaScript:

javascript
Copy code
const sntp = require("sntp");

// Configure the SNTP client
const options = {
  host: "pool.ntp.org", // You can use a public time server or your own server
  port: 123,
  timeout: 1000
};

// Fetch the synchronized time from the server
async function fetchSynchronizedTime() {
  const response = await sntp.time(options);
  return response.receiveTimestamp;
}

// Calculate the time difference
async function timeDifference(messageTimestamp) {
  const currentTime = await fetchSynchronizedTime();
  const timeElapsed = currentTime - messageTimestamp;

  // Format the time difference as needed (e.g., into minutes, hours, days, etc.)
}
This approach has the advantage of providing more accurate time calculations and reducing the impact of clock drift. It also doesn't require constant server time fetching, as NTP and SNTP clients will synchronize their time with time servers automatically.


*/

export function getTimeSinceEventFormatted(event: Date) {
  if (!(event instanceof Date)) {
    return 'Invalid date';
  }

  const clientTime = new Date().getTime();
  const timeElapsed = clientTime - event.getTime();
  return formatTimeSinceEvent(timeElapsed);
}

export function formatTimeSinceEvent(time: number) {
  const seconds = Math.floor(time / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'just now';
  } else if (minutes === 1) {
    return '1 minute ago';
  } else if (minutes < 60) {
    return minutes + ' minutes ago';
  } else if (hours === 1) {
    return '1 hour ago';
  } else if (hours < 24) {
    return hours + ' hours ago';
  } else if (days === 1) {
    return '1 day ago';
  } else if (days <= 4) {
    return days + ' days ago';
  } else {
    const date = new Date(Date.now() - time);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date
      .getFullYear()
      .toString()
      .slice(-2)}`;
    return formattedDate;
  }
}
