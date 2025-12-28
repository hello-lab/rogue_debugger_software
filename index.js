import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { supabaseAdmin } from "./supabase.js"
import { isEmailAllowed } from "./allowlist.js"

dotenv.config()

const app = express()
const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}

app.use(cors(corsOptions))
app.options("/login", cors(corsOptions))
app.use(express.json())

app.post("/login", async (req, res) => {
  try {
    const { email,password } = req.body

    if (!email) {
      return res.status(400).json({ error: "Email required" })
    }

    const allowed = await isEmailAllowed(email)

    if (!allowed) {
      return res.status(403).json({ error: "Not authorized" })
    }

     const { data, error } =
    await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });
    console.log(email,password,error)

    if (error) {
      return res.status(500).json({ error: error.message })
    }
 return res.json({
    user: data.user,
    session: data.session,
  });} 
  catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

app.post("/register", async (req, res) => {
  const { email, password, teamName } = req.body;

  // 1️⃣ Google Sheet allowlist
  const allowed = await isEmailAllowed(email);
  if (!allowed) {
    return res.status(403).json({ error: "Email not authorized" });
  }

  // 2️⃣ Create user (admin)
  const { data: userData, error: userError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (userError) {
    return res.status(400).json({ error: userError.message });
  }

  // 3️⃣ Create team
  const { data: team, error: teamError } = await supabaseAdmin
    .from("teams")
    .insert({ team_name: teamName })
    .select()
    .single();

  if (teamError) {
    return res.status(400).json({ error: teamError.message });
  }

  // 4️⃣ Create membership
  await supabaseAdmin.from("team_members").insert({
    user_id: userData.user.id,
    team_id: team.id,
    role: "leader",
    email,
  });

  // 5️⃣ Create session
  const { data: sessionData, error: sessionError } =
    await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

  if (sessionError) {
    return res.status(500).json({ error: "Session creation failed" });
  }

  return res.json({
    user: sessionData.user,
    session: sessionData.session,
  });
});



app.listen(3001, () => {
  console.log("Auth server running on http://localhost:3001")
})
