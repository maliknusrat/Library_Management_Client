// Get current date
const currentDate = new Date();

// Get date 7 days from now
const sevenDaysLater = new Date();
sevenDaysLater.setDate(currentDate.getDate() + 7);

// Format dates as strings (optional)
const formattedCurrentDate = currentDate.toISOString().split('T')[0]; // yyyy-mm-dd
const formattedSevenDaysLater = sevenDaysLater.toISOString().split('T')[0]; // yyyy-mm-dd

console.log("Current date:", formattedCurrentDate);
console.log("Date 7 days later:", formattedSevenDaysLater);
