let express = require('express');

let datas = require('./datas.json');
let fs = require('fs');
let bodyParser = require('body-parser'); // Parser le corps de la requete et ses paramètres (SECURITE)

var cors = require('cors'); //allow another localhost access to this server


/**
 * Init Express Server
 */
let app = express();


//use body parser for security
app.use(bodyParser.json());




/***************************************************************************************************************
 * 
 * Utilisez Nodemon.js
 * https://nodemon.io/
 * 
 ***************************************************************************************************************/

// use it before all route definitions
app.use(cors({ origin: 'http://localhost:8080' }));


/**
 ****************************************** API ************************************************ 
 */


/**
 * "/" Home: load all json
 */
app.get('/', function (req, res) {
    res.json(datas);
});

/**
 * Limit de à
 */
app.get('/:debut-:fin', function (req, res) {
    let debut = req.params.debut;
    let fin = req.params.fin;

    let tab = datas.splice(debut, fin);
    res.json(tab);
});



app.delete('/delete/:id', function (req, res) {
    let id = req.params.id;
    datas = datas.filter((elt) => elt.id != id);

    let json = JSON.stringify(datas);
    fs.writeFile('datas.json', json, 'utf8', () => {
        res.json('ok');
    });
});

/**
 * "/visible" visible
 */
app.get('/visible', function (req, res) {
    let visibles = datas.filter((task) => task.visible == true);
    res.json(visibles);
});

/**
 * "star" >= 7
 */
app.get('/stars', function (req, res) {
    let stars = datas.filter((task) => task.visible >= stars);
    return stars
});

/**
 * Route search
 */
app.get('/search/:word', function (req, res) {
    let word = req.params.word;
    if (!word) {
        res.json(datas);
    }
    let regex = new RegExp(word, 'i')
    let filtrer = datas.filter((task) => regex.test(task.title));

    res.json(filtrer);
});

/**
 * Visibilite
 */
app.get('/visibilite/:visible', function (req, res) {
    let visibility = req.params.visible;
    let filtrer = datas.filter((task) => task.visible == visibility);

    res.json(filtrer);
});



/**
 * Change title
 */
app.get('/change-title/:id/:title', function (req, res) {
    let id = req.params.id;
    let title = decodeURIComponent(req.params.title); // parse Boolean

    let post = datas.find((elt) => elt.id == id); // get reference of datas
    post.title = title;

    let json = JSON.stringify(datas);
    fs.writeFile('datas.json', json, 'utf8', () => {
        res.json(datas);
    });
});

app.get('/change-visibility/:id/:visible', function (req, res) {
    let id = req.params.id;
    let visible = req.params.visible === "true"; // parse Boolean
    let post = datas.find((elt) => elt.id == id); // get reference of datas
    post.visible = visible;

    let json = JSON.stringify(datas);
    fs.writeFile('datas.json', json, 'utf8', () => {
        res.json(datas);
    });
});

/**
 * Add post
 */
app.post('/save', function (req, res) {
    console.log(req.body)
    let obj = req.body; //recupérationd e l'objet
    obj.id = datas.length + 1;
    datas.push(obj);
    let json = JSON.stringify(datas);
    fs.writeFile('datas.json', json, 'utf8', () => {
        res.json(obj);
    });

});




/**
 * Port listened
 */
app.listen(3000, function () {
    console.log('Le serveur des taches est lancé!')
})