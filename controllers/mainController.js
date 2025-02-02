const fs = require("fs");

//Controller for viewing all items available in the JSON object
const viewDetails = async(req, res) => {
    fs.readFile( __dirname + "/" + "../movies.json", 'utf8', function (err, data) {
      let id = req.params.id;
      var data =JSON.parse(data);
      for (var i = 0 ; i < data.movies.length ;i++)
      {
        // execute when condition satisfy where = to id
        if(data.movies[i].id == id){
          res.render("view", { title: data.movies[i].title, plot: data.movies[i].plot, director: data.movies[i].director, date: data.movies[i].date, actors: data.movies[i].actors,genre: data.movies[i].genre, image: data.movies[i].image,});
        }
      }
    });
  }

  //Controller for deletion of items on the JSON File
  const deleteMovie = async(req, res) => {
    fs.readFile( __dirname + "/" + "../movies.json", 'utf8', function (err, data) {
        let id = req.params.id;
        var data =JSON.parse(data);
        for (var i = 0 ; i < data.movies.length ;i++)
        {
            if(data.movies[i].id == id){
                data.movies.splice(i, 1);
                jsonToString = JSON.stringify(data, null, 2);
                fs.writeFile('movies.json', jsonToString, function writeJSON(err) {
                    if(err){
                        return console.log(err);
                    }
                });
                res.redirect("/"); 
                return false;
            } 
        }    
    });
  }
// Add data to JSON File
  const addMovie = async (req ,res) => {
    var title = req.body.title;
    var director = req.body.director;
    var date = req.body.date;
    var actor = req.body.actor;
    var genre = req.body.genre;
    var plot = req.body.plot;
    var img = "/images/" + req.file.filename;

    fs.readFile( __dirname + "/" + "../movies.json", 'utf8', function (err, data) {
      var obj = JSON.parse(data);
      var mid = obj.movies[obj.movies.length-1].id;
      var index = mid + 1;
      obj["movies"].push({"id": index,
       "title":title,
       "plot": plot,
       "director":director,
       "date": date,
       "actors": actor, 
       "genre": genre,
       "image": img
      });
      jsonStr = JSON.stringify(obj, null, 2);
      fs.writeFile('movies.json', jsonStr, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
        }
      });
      res.redirect('/');
    }); 
  };

// render existing JSON objects.
 const renderData = async(req, res) => {
    fs.readFile( __dirname + "/" + "../movies.json", 'utf8', function (err, data) {
        let id = req.params.id;
        var data =JSON.parse(data);
        for (var i = 0 ; i < data.movies.length ;i++)
        {
          // execute when condition satisfy where = to id
        if(data.movies[i].id == id){
          res.render("edit", { id: data.movies[i].id, title: data.movies[i].title, plot: data.movies[i].plot, director: data.movies[i].director, date: data.movies[i].date, actors: data.movies[i].actors,genre: data.movies[i].genre, image: data.movies[i].image,});
        }
        }
    });
};

const updateData = async(req, res) => {
  fs.readFile( __dirname + "/" + "../movies.json", 'utf8', function (err, data) {
      let id = req.params.id;
      var title = req.body.title;
      var director = req.body.director;
      var date = req.body.date;
      var actors = req.body.actor;
      var genre = req.body.genre;
      var plot = req.body.plot;
      var img = "/images/" + req.file.filename;
      var data =JSON.parse(data);
      for (var i = 0 ; i < data.movies.length ;i++)
      {
        if(data.movies[i].id == id){
          data.movies[i].title = title;
          data.movies[i].date = date;
          data.movies[i].director = director;
          data.movies[i].actors = actors;
          data.movies[i].genre = genre;
          data.movies[i].plot = plot;
          data.movies[i].image = img;
          jsonStr = JSON.stringify(data, null, 2);
          fs.writeFile('movies.json', jsonStr, function writeJSON(err) {
            if (err) return console.log(err);
        });
      }
    }
});
res.redirect("/");
}


module.exports = { viewDetails, deleteMovie, addMovie, renderData, updateData }