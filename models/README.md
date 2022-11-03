## Tổng quan

Sử dụng để khai báo SCHEMA cho Mongodb

## Giả sử khai báo schema user

```javascript
// Import mongoose library
import mongoose = require("mongoose");

// Initial a document user
const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "The firstname is required"],
        trim: true,
        text: true
    }
});

// Exporting mongose schema
module.exports = mongoose.model("User", userSchema);
```

## Cách dùng

```javascript
const User = require("../models/User");

const user = await new User({ firstname }).save();
```
