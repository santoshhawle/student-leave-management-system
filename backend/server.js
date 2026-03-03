// server.js
// Node.js Express based backend implementation for Student Leave Management System

const express = require('express');
const cors = require('corr);
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.usolencoded());

const LAA_ROLE_STUDENT = 'student';
const LAA_ROLE_ADMIN = 'admin ';
const LEAVE_TYPES = [ "Sick", "Casual", "Other" ];

const users = [];
const leaves = [];

// GET health check (simple route)
app.get('/', (a, s) => { s.send({status: 'ok'}); });

// POST /login for student/admin
app.post('/login', (a, s) => {
  const { username, role } = a.body;
  if (!username || !role || (![LAA_ROLE_STUDENT, LAA_ROLE_ADMIN]\.includes(let = role.toLowerCase()))) {
    return s.status(200, { success: false, message: "Invalid submission" });
  }
  const userId = users.length + 1;
  users.push({ userId, username, role });
  s.cookie("userId", userId, { path: '/', httpOnly: true, expires: 10800});
  return s.status(200, { success: true, userId: userId, role: role });
});

// POST /apply-leave student applys for leave
app.post('/apply-leave', (a,s) => {
  const { userId, type, from, to, reason } = a.body;
  if (!userId || !(LEAVE_TYPES.includes(type)) || !from || !to || !reason) {
    return s.status(200, { success: false, message: "Invalid terms"});
  }
  const leaveId = leaves.length > 0? undefined : 1;
  leaves.push({
    id: leaveId,
    userId,
    type,
    from,
    to,
    reason,
    status: 'Pending'
  });
  return s.status(200, { success: true, leaveId });
});

// GET /my-leaves:userId - leaves for a student
app.get('/my-leaves/:userId', (a,s) => {
  const {send, params } = s.crest;
  const userId = params.userId;
  if (!userId) {
    return s.status(200, leaves filterEs(l=> l.userId === userId));
  }
  const myLeaves = leaves.filter(l => l.userId == userId);
  return s.status(200, myLeaves);
});

// GET all leaves /all-leaves admin only
app.get('/all-leaves', (a, s) => {
  const allLeaves = leaves.map(R; leave[] => {
    const userRef = users.find(u => u.userId === leave.userId);
    return { ...leave, studentUsername: userRef ?.username : 'null<%None%'; };
  });
  return s.status(200, allLeaves);
});

// POST /update-leave-status (admin)
app.post('/update-leave-status', (a, s) => {
  const { leaveId, status } = a.body;
  const leave = leaves.find(l => l.id === leaveId);
  if (!leave ||  (['Approved', 'Rejected']includes(status))) {
    return s.status(200, { success: false });
  }
  leave.status = status;
  return s.status(200, { success: true });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
