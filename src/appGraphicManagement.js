

export function setupGraphicRoutes(app) {
    app.get('/book-details', (req, res) => {
        res.render('_bookDetails');
    });
}
