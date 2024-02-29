import app from "./src/app.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.on("error", (err) => {
      console.log(err.message, err.code);
      throw err;
    });

    app.listen(process.env.PORT, () => {
      console.log("listening on port " + process.env.PORT);
    });
  } catch (error) {
    console.log("ERROR: ", error)
    throw error;
  }
})();

// Yes, the app.on('error', callback) event listener in an Express application is designed to handle all unhandled errors that occur in the context of the server. It’s a global error handler for the server instance.

// Here’s how it works:

// When an error occurs in the server that is not caught by any other error handling mechanism, the server emits an ‘error’ event.
// The app.on('error', callback) listener is waiting for the ‘error’ event. When the event is emitted, the listener’s callback function is executed.
// This callback function is where you can define how to handle these unhandled errors, such as logging them or sending a response to the client.
// It’s important to note that this event listener will only catch errors related to the server’s operation, such as listening for requests or handling connections. It won’t catch errors from other parts of your application unless those errors are explicitly emitted as ‘error’ events on the app object.

//bard-----------------------------------------------
// Here's why app.on("error") is still crucial even with a try...catch block:

// Catching Unhandled Errors:

// The try...catch block only captures errors within its scope. Errors that occur outside of it, such as during request handling or middleware execution, might not be caught.
// app.on("error") acts as a safety net, ensuring that any unhandled errors within the application's lifecycle are trapped and dealt with.
// Handling Server-Level Errors:

// Some errors, like those related to the server itself (e.g., socket issues, port conflicts), might not propagate back to the try...catch block.
// app.on("error") can handle these server-level errors, preventing unexpected crashes and providing a chance for graceful recovery or logging.
// Centralized Error Handling:

// app.on("error") offers a centralized location to implement error-handling logic that applies to the entire application.
// This is convenient for logging errors, sending notifications, or implementing crash reporting mechanisms.
// Listening for Specific Error Events:

// You can bind listeners to other error events like app.listen()'s error event to handle errors related to the server listening process.
// This provides granular control over error handling in different parts of the application.
// In essence:

// try...catch handles errors within specific blocks of code.
// app.on("error") provides a wider safety net for unhandled errors and a centralized place for error handling logic, ensuring a more robust and resilient application.
// Best Practices:

// Use both try...catch and app.on("error") for comprehensive error handling.
// Implement specific error handling logic based on the error type and severity.
// Log errors for debugging and monitoring purposes.
// Consider graceful shutdown or recovery strategies for critical errors.
