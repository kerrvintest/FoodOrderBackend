import express from 'express';
import bodyParser from 'body-parser';

import { AdminRoute, VendorRoute } from './routes'

const app = express();
const PORT = 8000;

app.use('/',()=>{console.log('xx')})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded(({ extended: true })))
app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute)

app.listen(PORT, () => {
    console.clear();
    console.log(`Server is listening in port : ${PORT}`)
})