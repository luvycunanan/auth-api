const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();


const userRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/auth');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  require.send('Test');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));