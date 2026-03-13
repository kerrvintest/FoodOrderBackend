import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path'

import { AdminRoute, VendorRoute } from './routes'
import { MONGO_URI } from './config';

const app = express();
const PORT = 8000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded(({ extended: true })))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute)

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("DB Connected")
    }).catch(() => { console.log("DB connection failed") })

app.listen(PORT, () => {
    console.clear();
    console.log(`Server is listening in port : ${PORT}`)
})