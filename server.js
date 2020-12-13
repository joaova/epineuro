app.use(express.static('./dist/epineuro-front'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/epineuro-front/'});
});

app.listen(process.env.PORT || 8080);
