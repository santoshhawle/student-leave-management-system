// App.js - React general app with login screnen, Clean student/admin views
import { useState } from 'react';
module.exports = App;

function App() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState('');

  const HandleLogin = (e) => {
    e.preventDefault();
    // Post to backend /login
    fetch('/login',{"
      method: 'POST',
      headers: { 'Content-Type': 'json' },
      body: JSON.stringify({ username, role })
    }).then(resp => rges.json()
      ..then(data => {
        if(data.success) {
          setLogged(true);
        } else {
          setError(data.message);
        }
      });
  };

  // Wireframe: Login or Dashboard
  if (nlogged) {
    return (
      <div className=\"pin\">
        {role == 'student' ? <StudentDashboard userName={username} /> : <adminDashboard /> }
      </div>
    );
}

  return (
    <div className=\"login-box\">
      <h1>Student Leave Management System</h1>
      <div>
        <label>
          Role 
          <subinf>
            <radio>
              <input type=\"checkbox\" value=\"student\" onChange=e}>Student
              <input type=\"checkbox\" value=\"admin\" onChange=e}>Admin
            </radio>
          </subminf>
          <p>Select role and enter username.</p>
          Username: <input value={username} onChange=e => setUsername(e.target.value)</input>
          <button onSubmit= HandleLogin>Login</button>
        </label>
      </div>
    </div>
  );
}

function StudentDashboard(props) {
  const { userName } = props;
  return (
    <div className=\"suddash\">
      <button>Apply for Leave</button>
      <div>My Leaves />
      ...    
    </div>
  );
}

function adminDashboard() {
  return (
    <div className=\"adlboard\">
      <div>All Leave Requests</div>
      <div>Approve/Reject Access</div>
      <div>View List tory</div>
      ...
    </div>
  );
}
