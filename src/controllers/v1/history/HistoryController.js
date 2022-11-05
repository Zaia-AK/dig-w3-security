const Patient = require('../../../models/Patient');
const {History} = require('../../../models/History');

const {success, error} = require('../../../utils/responser')



const getAllHistory = async (req, res)=>{
    let historyList = await History.find()
    return res.status(200).json(success(200,historyList,"Success"))
}

const addPrescription = async (req, res)=>{
    const id = req.params.id;
    let h =  await History.findById(id);
    h.prescription.push(req.body)
    h.save()
    return res.status(200).json(success(200,h,"Success"))

} 
const getHistory = (req, res)=>{
    const id = req.params.id;
    History.findById(id)
    .populate('history')
    .then((r)=>{
        return res.status(200).json(success(200,r,"Success"))

    })
    .catch((e)=>{
        console.error(e)
    })
}

const deleteHistory_by_id = async (req, res)=>{
    const id = req.params.id;
    try {
        const p = await History.findByIdAndDelete(id);
        return res.status(200).json(success(200,p,"Ok"))
    } catch (error) {
        return res.status(500).json(error(500,"Server Side Error"))
    }

}



module.exports = {
    getAllHistory,
    getHistory,
    deleteHistory_by_id,
    addPrescription
}