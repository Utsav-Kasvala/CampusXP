import express from 'express'
import { getLeaderboard} from '../Controllers/LeaderBoardController.js';

const router = express.Router();

// Define the route for getting the leaderboard
router.get('/', getLeaderboard);

export default router;

