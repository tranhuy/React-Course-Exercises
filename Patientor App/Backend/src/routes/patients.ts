import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientData } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getAll());
});

router.get('/:id', (req, res) => {
    try {
        res.send(patientService.getPatientData(req.params.id));
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        }
    }
});  

router.post('/', (req, res) => {
    try {
        const newPatientData = toNewPatientData(req.body);
        const newPatient = patientService.addPatient(newPatientData);

        res.json(newPatient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        }
    }    
})

export default router;