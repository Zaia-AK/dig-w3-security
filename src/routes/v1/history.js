const express = require('express')
const router = express.Router()
const {getAllHistory,addPrescription} = require('../../controllers/v1/history/HistoryController')
const {getHistory} = require('../../controllers/v1/history/HistoryController')
const {deleteHistory_by_id} = require('../../controllers/v1/history/HistoryController')


router.get('/', getAllHistory);
router.post('/:id/prescription', addPrescription);
router.get('/', getHistory);
router.delete('/', deleteHistory_by_id);
module.exports = router;

