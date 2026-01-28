let processes = [];

function generateProcessInputs() {
  const num = parseInt(document.getElementById('numProcesses').value);
  const form = document.getElementById('processForm');
  form.innerHTML = '';

  for (let i = 0; i < num; i++) {
    form.innerHTML += `
      <div>
        <label>P${i+1} Arrival Time: <input type="number" id="arrival${i}" min="0"></label>
        <label>Burst Time: <input type="number" id="burst${i}" min="1"></label>
      </div>
    `;
  }
}

function runSimulation() {
  // Get process data
  const num = parseInt(document.getElementById('numProcesses').value);
  processes = [];
  for (let i = 0; i < num; i++) {
    const arrival = parseInt(document.getElementById(`arrival${i}`).value);
    const burst = parseInt(document.getElementById(`burst${i}`).value);
    processes.push({ pid: i+1, arrival, burst });
  }

  const algorithm = document.querySelector('input[name="algorithm"]:checked').value;
  let quantum = parseInt(document.getElementById('quantum').value) || 1;

  let schedule;
  if (algorithm === 'fcfs') schedule = fcfs(processes);
  else if (algorithm === 'sjf') schedule = sjf(processes);
  else if (algorithm === 'rr') schedule = roundRobin(processes, quantum);

  drawGantt(schedule);
  showResults(schedule);
}

// Placeholder for algorithms
function fcfs(processes) { /* implement FCFS */ return []; }
function sjf(processes) { /* implement SJF */ return []; }
function roundRobin(processes, quantum) { /* implement RR */ return []; }

function drawGantt(schedule) {
  const chart = document.getElementById('ganttChart');
  chart.innerHTML = '';
  schedule.forEach(block => {
    const div = document.createElement('div');
    div.className = 'gantt-block';
    div.style.flex = block.burst;
    div.textContent = `P${block.pid}`;
    chart.appendChild(div);
  });
}

function showResults(schedule) {
  // Compute average waiting and turnaround time
}
