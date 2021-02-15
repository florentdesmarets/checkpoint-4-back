require('dotenv').config();
const PORT = process.env.PORT;
const app = require('./app');
const fileUpload = require('express-fileupload')

app.use(fileUpload());

app.post('/api/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ errorMessage: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`/home/wilder/Documents/Wild code school/Checkpoint/Checkpoint-4/checkpoint-4-front/public/upload/${file.name}`, err => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/upload/${file.name}`});
  });

})


app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error: ${err.message}`);
  } else {
    console.log(`Server is running on port: ${PORT}`);
  }
});