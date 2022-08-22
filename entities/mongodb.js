const uri = process.env.uri;

const dbConnect = (mongoose) => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('error', err => {
    console.log(err);
    });
};

module.exports = { dbConnect };
