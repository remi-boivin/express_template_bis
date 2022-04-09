import express from 'express';

export { apiRouter };

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.send('Hello world');
})

// default: if no other path is corresponding, returns 404 error to user
apiRouter.use((_, response) => {
    response.status(404).json('404 error : endpoint not found');
});