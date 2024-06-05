// Function to convert time from 12-hour format to 24-hour format
function convertTo24HourFormat(time12h) {
    // Extract hours, minutes, and AM/PM from the time string
    const [time, modifier] = time12h.split(' ');
    const [hours, minutes] = time.split(':').map(str => parseInt(str));

    // Convert hours to 24-hour format
    let hours24;
    if (hours === 12) {
        hours24 = modifier === 'AM' ? 0 : 12;
    } else {
        hours24 = modifier === 'AM' ? hours : hours + 12;
    }

    // Format hours and minutes to have leading zeros if needed
    const formattedHours = String(hours24).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Return time in 24-hour format
    return `${formattedHours}:${formattedMinutes}`;
}

// Function to parse time strings and return total minutes
function getTimeInMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(str => parseInt(str));
    return hours * 60 + minutes;
}

// Given times in 12-hour format
const currentRequestTime = '12:42 AM';
const expireIssueTime = '01:42 AM';

// Convert times to 24-hour format
const currentRequestTime24h = convertTo24HourFormat(currentRequestTime);
const expireIssueTime24h = convertTo24HourFormat(expireIssueTime);

// Parse times to minutes
const currentMinutes = getTimeInMinutes(currentRequestTime24h);
const expireMinutes = getTimeInMinutes(expireIssueTime24h);

// Calculate the difference in minutes
let timeDifference = expireMinutes - currentMinutes;

// If the difference is negative, it means the expire time is on the next day
if (timeDifference < 0) {
    timeDifference += 24 * 60; // Add 24 hours in minutes
}

// Convert difference to hours and minutes
const hoursDifference = Math.floor(timeDifference / 60);
const minutesDifference = timeDifference % 60;

console.log('Time difference in hours:', hoursDifference);
console.log('Time difference in minutes:', timeDifference);
