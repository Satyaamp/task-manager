const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');

dotenv.config();

/* ======================================================
   ✅ ENV DETECTION
   ====================================================== */

const IS_PROD = process.env.NODE_ENV === 'production';
const ENABLE_COLOR = !IS_PROD && process.stdout.isTTY;

/* ======================================================
   ✅ COLOR HELPERS (DEV ONLY)
   ====================================================== */

const green  = (t) => ENABLE_COLOR ? `\x1b[32m${t}\x1b[0m` : t;
const cyan   = (t) => ENABLE_COLOR ? `\x1b[36m${t}\x1b[0m` : t;
const yellow = (t) => ENABLE_COLOR ? `\x1b[33m${t}\x1b[0m` : t;
const gray   = (t) => ENABLE_COLOR ? `\x1b[90m${t}\x1b[0m` : t;

/* ======================================================
   ✅ SLEEP (ANIMATION SAFE)
   DEV  -> delay works
   PROD -> delay = 0
   ====================================================== */

const sleep = (ms) =>
  new Promise(r => setTimeout(r, IS_PROD ? 0 : ms));

/* ======================================================
   ✅ ASCII LOGO (DEV ONLY)
   ====================================================== */

function showLogo() {
  if (IS_PROD) return;

  console.log(cyan(`
███████╗ █████╗ ████████╗██╗   ██╗ █████╗ ███╗   ███╗
██╔════╝██╔══██╗╚══██╔══╝╚██╗ ██╔╝██╔══██╗████╗ ████║
███████╗███████║   ██║    ╚████╔╝ ███████║██╔████╔██║
╚════██║██╔══██║   ██║     ╚██╔╝  ██╔══██║██║╚██╔╝██║
███████║██║  ██║   ██║      ██║   ██║  ██║██║ ╚═╝ ██║
╚══════╝╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝

        ‹‹  Satyam Kumar  ››
`));
}

/* ======================================================
   ✅ AUTHOR IDENTITY (DEV & PROD)
   ====================================================== */

function showIdentity() {
  const line = '='.repeat(60);
  console.log(gray(line));
  console.log(' Author  : Satyam Kumar');
  console.log(' Role    : Backend Developer (Node.js, MongoDB)');
  console.log(' Project : Task Manager API');
  console.log(' GitHub  : https://github.com/Satyaamp/task-manager');
  console.log(gray(line + '\n'));
}

/* ======================================================
   ✅ PROGRESS BAR
   DEV  -> animated
   PROD -> instant
   ====================================================== */

async function progress(label, width = 20) {
  if (IS_PROD) {
    console.log(`${label} ✅`);
    return;
  }

  process.stdout.write(gray(label.padEnd(22)));
  for (let i = 0; i < width; i++) {
    process.stdout.write(green('▋'));
    await sleep(25);
  }
  process.stdout.write(green(' ✅\n'));
}

/* ======================================================
   ✅ SECTION LOG
   DEV  -> animated lines
   PROD -> instant
   ====================================================== */

async function animateSection(title, lines) {
  const sep = '-'.repeat(60);

  console.log(sep);
  console.log(yellow(title));
  console.log(sep);

  if (IS_PROD) {
    lines.forEach(l => console.log(l));
  } else {
    for (const line of lines) {
      console.log(cyan(line));
      await sleep(120);
    }
  }

  console.log();
}

/* ======================================================
   ✅ EXPRESS APP
   ====================================================== */

const app = express();
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts. Try again later.'
});

app.use('/api/auth/login', loginLimiter);

app.get('/', (req, res) => {
  res.send('✅ Task Manager API is running');
});

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

/* ======================================================
   ✅ START SERVER
   ====================================================== */

const PORT = process.env.PORT || 5000;

(async () => {

  if (!IS_PROD) console.clear();

  showLogo();
  await sleep(300);
  showIdentity();

  console.log(green('✅ Connecting MongoDB'));
  const dbInfo = await connectDB();

  await progress('Loading Middlewares');
  await progress('Registering Routes');
  await progress('Applying Security');

  app.listen(PORT, async () => {

    await animateSection(
      'DATABASE CONNECTION SUCCESS',
      [
        `Host        : ${dbInfo.host}`,
        `Database    : ${dbInfo.name}`,
        `State       : Connected`,
        `Node        : ${dbInfo.node}`,
        `Mongoose    : ${dbInfo.mongoose}`,
        `OS          : ${dbInfo.os}`,
        `Memory Used : ${dbInfo.memory}`,
        `Time        : ${dbInfo.time}`
      ]
    );

    await animateSection(
      'SERVER STARTED SUCCESSFULLY',
      [
        `Status : Running`,
        `Port   : ${PORT}`,
        `Mode   : ${process.env.NODE_ENV || 'development'}`,
        `PID    : ${process.pid}`,
        `Time   : ${new Date().toLocaleString()}`
      ]
    );

    console.log(gray('============================================================'));
    console.log(green('✅ SERVER READY'));
    console.log(gray('============================================================'));
  });
})();
