const { Op } = require('sequelize');
const WalkInQueue = require('../models/WalkInQueue');
const Appointment = require('../models/Appointment');
const { memoryAppointments } = require('./appointmentController');
const { getIsConnected } = require('../config/db');

const getTodayDateString = () => {
  return new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

// In-memory fallback dataset for offline mode
let memoryQueue = [
  {
    id: 1,
    patientName: 'Sophia Reynolds',
    patientNumber: '+1 (555) 234-8899',
    reason: 'Toothache & Emergency Consultation',
    tokenNumber: 'TK-01',
    isTreated: false,
    date: getTodayDateString(),
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    patientName: 'Marcus Sterling',
    patientNumber: '+1 (555) 345-9900',
    reason: 'Routine Cleaning & Polishing',
    tokenNumber: 'TK-02',
    isTreated: false,
    date: getTodayDateString(),
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    patientName: 'Elena Rostova',
    patientNumber: '+1 (555) 456-1122',
    reason: 'Veneer Fitting & Checkup',
    tokenNumber: 'TK-03',
    isTreated: true,
    date: getTodayDateString(),
    createdAt: new Date().toISOString()
  }
];

// GET today's queue & live counts (ONLY Accepted & Confirmed appointments appear)
const getTodayQueue = async (req, res) => {
  try {
    const today = getTodayDateString();
    let mergedQueue = [];

    if (getIsConnected()) {
      const walkInList = await WalkInQueue.findAll({
        where: { date: today },
        order: [['id', 'ASC']]
      });

      // STRICT REQUIREMENT: Only retrieve appointments where status = 'accepted' or 'Confirmed'
      const acceptedAppointments = await Appointment.findAll({
        where: {
          status: {
            [Op.in]: ['Accepted', 'accepted', 'Confirmed', 'confirmed']
          }
        },
        order: [['id', 'ASC']]
      });

      const walkInFormatted = walkInList.map(w => ({
        id: `walkin-${w.id}`,
        patientName: w.patientName,
        patientNumber: w.patientNumber,
        reason: w.reason,
        tokenNumber: w.tokenNumber,
        isTreated: w.isTreated,
        date: w.date,
        createdAt: w.createdAt
      }));

      const apptFormatted = acceptedAppointments.map((a, index) => ({
        id: `appt-${a.id}`,
        patientName: a.patientName,
        patientNumber: a.patientPhone,
        reason: `${a.serviceName} - ${a.doctorName}`,
        tokenNumber: `TK-${String(walkInList.length + index + 1).padStart(2, '0')}`,
        isTreated: a.status === 'Completed' || a.status === 'completed',
        date: a.date,
        createdAt: a.createdAt
      }));

      mergedQueue = [...walkInFormatted, ...apptFormatted];
    } else {
      const todayList = memoryQueue.filter(q => q.date === today);

      // STRICT REQUIREMENT: Filter memory appointments strictly for accepted/confirmed
      const acceptedMemoryAppts = (memoryAppointments || []).filter(
        a => a.status === 'Accepted' || a.status === 'accepted' || a.status === 'Confirmed' || a.status === 'confirmed'
      );

      const apptFormatted = acceptedMemoryAppts.map((a, index) => ({
        id: `appt-${a.id}`,
        patientName: a.patientName,
        patientNumber: a.patientPhone,
        reason: `${a.serviceName} - ${a.doctorName}`,
        tokenNumber: `TK-${String(todayList.length + index + 1).padStart(2, '0')}`,
        isTreated: a.status === 'Completed' || a.status === 'completed',
        date: a.date,
        createdAt: a.createdAt
      }));

      mergedQueue = [...todayList, ...apptFormatted];
    }

    const waitingCount = mergedQueue.filter(q => !q.isTreated).length;
    const treatedCount = mergedQueue.filter(q => q.isTreated).length;

    return res.json({
      success: true,
      date: today,
      waitingCount,
      treatedCount,
      totalToday: mergedQueue.length,
      queue: mergedQueue
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE new walk-in patient queue entry
const createQueueEntry = async (req, res) => {
  try {
    const { patientName, patientNumber, reason, tokenNumber, isTreated } = req.body;

    if (!patientName || !patientNumber || !reason) {
      return res.status(400).json({
        success: false,
        message: 'Patient Name, Phone Number, and Reason for visit are required.'
      });
    }

    const today = getTodayDateString();

    if (getIsConnected()) {
      const existingToday = await WalkInQueue.count({ where: { date: today } });
      const generatedToken = tokenNumber || `TK-${String(existingToday + 1).padStart(2, '0')}`;

      const newEntry = await WalkInQueue.create({
        patientName,
        patientNumber,
        reason,
        tokenNumber: generatedToken,
        isTreated: isTreated === true || isTreated === 'yes' || isTreated === 'true',
        date: today
      });

      return res.status(201).json({
        success: true,
        message: 'Patient added to live queue successfully!',
        entry: newEntry
      });
    } else {
      const todayList = memoryQueue.filter(q => q.date === today);
      const generatedToken = tokenNumber || `TK-${String(todayList.length + 1).padStart(2, '0')}`;

      const newEntry = {
        id: memoryQueue.length + 1,
        patientName,
        patientNumber,
        reason,
        tokenNumber: generatedToken,
        isTreated: isTreated === true || isTreated === 'yes' || isTreated === 'true',
        date: today,
        createdAt: new Date().toISOString()
      };

      memoryQueue.push(newEntry);

      return res.status(201).json({
        success: true,
        message: 'Patient added to live queue successfully!',
        entry: newEntry
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE treated status (Yes / No)
const updateTreatedStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isTreated } = req.body;

    const boolValue = isTreated === true || isTreated === 'yes' || isTreated === 'true';

    if (getIsConnected()) {
      const entry = await WalkInQueue.findByPk(id);
      if (!entry) {
        return res.status(404).json({ success: false, message: 'Queue entry not found' });
      }

      await entry.update({ isTreated: boolValue });

      return res.json({
        success: true,
        message: `Patient treated status updated to ${boolValue ? 'Yes (Treated)' : 'No (In Queue)'}`,
        entry
      });
    } else {
      const entry = memoryQueue.find(q => String(q.id) === String(id));
      if (!entry) {
        return res.status(404).json({ success: false, message: 'Queue entry not found' });
      }

      entry.isTreated = boolValue;

      return res.json({
        success: true,
        message: `Patient treated status updated to ${boolValue ? 'Yes (Treated)' : 'No (In Queue)'}`,
        entry
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE queue entry
const deleteQueueEntry = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      await WalkInQueue.destroy({ where: { id } });
    } else {
      memoryQueue = memoryQueue.filter(q => String(q.id) !== String(id));
    }

    res.json({ success: true, message: 'Patient removed from queue' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTodayQueue,
  createQueueEntry,
  updateTreatedStatus,
  deleteQueueEntry
};
