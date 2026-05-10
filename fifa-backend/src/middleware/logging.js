const myMdw = (req, res, next ) => {
    console.log('Se hizo una request a '+req.url);
    res.setHeader("Content-type", "text/html");
    next();
}

module.exports = myMdw;