const location = require("./../models/locationModel");

exports.createLocation = async (req, res, next) => {
    try {
        // console.log(productId);
        const locationData = {
          title: req.body.title,
          artitle: req.body.artitle,
          image: req.file.filename,
        };

        const loc = await location.create(locationData);
        res.status(201).json({
            message: "created",
            data: {
                loc,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "failed gdn",
            err,
        });
    }
};

exports.getLocations = async (req, res, next) => {
    try {
        const locations = await location.find();
        res.status(200).json({
            message: "success",
            data: {
                data: locations,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

exports.getLocation = async (req, res, next) => {
    try {
        const locations = await location.findById(req.params.id);
        if (!locations) next(err);

        res.status(200).json({
            message: "success",
            data: {
                locations,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};
exports.updateLocation = async (req, res, next) => {
    try {
          var categoryData = {
            ...req.body,
            image: req.file ? req.file.filename : req.file.filename,
          };

        // const locations = await location.findByIdAndUpdate(
        //   req.params.id,
        //   categoryData,
        //   {
        //     new: true,
        //   }
        const locations = await location.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).json({
            message: "success",
            data: {
                locations,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

exports.deleteLocation = async (req, res, next) => {
    try {
        const locations = await location.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "success",
            data: {
                locations,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

// filter by title
exports.getLocationByTitle = async (req, res) => {
    var  title  = req.query.title;
    try {
          var locations = await location.find({title:{ $regex: title, $options: 'i' }});
        // var locations = await location.find({title:title});
      res.status(201).json(locations);
    } catch (err) {
      res.status(422).json({ message: err.message });
    }
};


