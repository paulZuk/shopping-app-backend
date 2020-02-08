import { Router } from 'express';

const router = Router();

router.get('/', function (req, res) {
    res.send({test: 'test'});
});

export default router;
