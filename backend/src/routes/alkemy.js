const { Router } = require("express");
const {
    //USERS
    createUser,
    loginUser,
    //OPERATIONS
    getOperations,
    saveOperation,
    deleteOperation,
    updateOperation,
    getTotals
    
} = require("../controllers/alkemy");

const router = Router();


//USERS
router.post('/users', loginUser);

router.put('/users', createUser);


//OPERATIONS
router.post('/operations', getOperations);
router.post('/operations/totals', getTotals);

router.delete('/operations/:id', deleteOperation);

router.put('/operations', saveOperation);
router.put('/operations/:id', updateOperation);

module.exports = router;