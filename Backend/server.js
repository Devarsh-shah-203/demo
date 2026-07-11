import "./src/config/env.js";
import app from "./src/app.js";

import connectDB from "./src/config/db.js";


connectDB();

const PORT = process.env.PORT || 8000;



app.listen(PORT, '127.0.0.1',() => {
    console.log(`Server running on port ${PORT}`);
});

