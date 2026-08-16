// ==========================================
// AI YOUTUBE AUTOMATION AGENT
// STEP 4 - AUTO PIPELINE DEMO
// ==========================================

const generateBtn = document.getElementById("generateBtn");

const nicheInput = document.getElementById("niche");
const topicInput = document.getElementById("topic");
const languageInput = document.getElementById("language");
const videoTypeInput = document.getElementById("videoType");
const durationInput = document.getElementById("duration");
const audienceInput = document.getElementById("audience");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");
const progressText = document.getElementById("progressText");

const resultSection = document.getElementById("resultSection");
const resultTitle = document.getElementById("resultTitle");

const agents = [
  {
    id: "idea",
    name: "Idea Agent"
  },
  {
    id: "research",
    name: "Research Agent"
  },
  {
    id: "script",
    name: "Script Agent"
  },
  {
    id: "scene",
    name: "Scene Agent"
  },
  {
    id: "videoPrompt",
    name: "Video Prompt Agent"
  },
  {
    id: "voice",
    name: "Voice Agent"
  },
  {
    id: "thumbnail",
    name: "Thumbnail Agent"
  },
  {
    id: "seo",
    name: "SEO Agent"
  },
  {
    id: "quality",
    name: "Quality Control Agent"
  },
  {
    id: "export",
    name: "Export Agent"
  }
];


// ==========================================
// WAIT FUNCTION
// ==========================================

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// ==========================================
// GET AGENT ELEMENT
// ==========================================

function getAgent(id) {
  return document.querySelector(
    `.agent[data-agent="${id}"]`
  );
}


// ==========================================
// SET AGENT STATUS
// ==========================================

function setAgentStatus(id, status) {

  const agent = getAgent(id);

  if (!agent) return;

  const statusElement =
    agent.querySelector(".agent-status");

  agent.classList.remove(
    "waiting",
    "running",
    "completed",
    "error"
  );

  agent.classList.add(status);

  if (status === "waiting") {
    statusElement.textContent = "Waiting";
  }

  if (status === "running") {
    statusElement.textContent = "Running";
  }

  if (status === "completed") {
    statusElement.textContent = "Completed";
  }

  if (status === "error") {
    statusElement.textContent = "Error";
  }
}


// ==========================================
// UPDATE PROGRESS
// ==========================================

function updateProgress(completed) {

  const total = agents.length;

  const percent =
    Math.round((completed / total) * 100);

  progressFill.style.width = `${percent}%`;

  progressPercent.textContent =
    `${percent}%`;
}


// ==========================================
// RESET PIPELINE
// ==========================================

function resetPipeline() {

  agents.forEach(agent => {
    setAgentStatus(agent.id, "waiting");
  });

  updateProgress(0);

  progressText.textContent =
    "Preparing automatic production...";

  resultSection.classList.add("hidden");
}


// ==========================================
// VALIDATE USER INPUT
// ==========================================

function validateInput() {

  const niche = nicheInput.value.trim();
  const topic = topicInput.value.trim();

  if (!niche) {

    alert("Please enter your YouTube niche.");

    nicheInput.focus();

    return false;
  }

  if (!topic) {

    alert("Please enter your video topic.");

    topicInput.focus();

    return false;
  }

  return true;
}


// ==========================================
// GENERATE VIDEO
// ==========================================

async function startProduction() {

  if (!validateInput()) {
    return;
  }

  resetPipeline();

  generateBtn.disabled = true;

  generateBtn.innerHTML =
    "⚙️ AI Production Running...";

  const topic = topicInput.value.trim();

  try {

    for (let i = 0; i < agents.length; i++) {

      const currentAgent = agents[i];

      progressText.textContent =
        `${currentAgent.name} is working...`;

      // RUNNING
      setAgentStatus(
        currentAgent.id,
        "running"
      );

      // Demo processing delay
      await wait(1200);

      // COMPLETED
      setAgentStatus(
        currentAgent.id,
        "completed"
      );

      updateProgress(i + 1);

      await wait(300);
    }


    // ======================================
    // COMPLETE
    // ======================================

    progressText.textContent =
      "🎉 All AI agents completed successfully!";

    resultTitle.textContent = topic;

    resultSection.classList.remove("hidden");

    generateBtn.innerHTML =
      "🔄 Create Another Video";

  } catch (error) {

    console.error(error);

    progressText.textContent =
      "❌ Production failed. Please try again.";

    generateBtn.innerHTML =
      "🚀 Start Automatic Production";
  }

  generateBtn.disabled = false;
}


// ==========================================
// BUTTON EVENT
// ==========================================

generateBtn.addEventListener(
  "click",
  startProduction
);


// ==========================================
// EXPORT BUTTON
// ==========================================

const exportBtn =
  document.querySelector(".export-btn");

if (exportBtn) {

  exportBtn.addEventListener("click", () => {

    alert(
      "📦 Export system will be connected in a later step."
    );

  });

}


// ==========================================
// INITIAL STATE
// ==========================================

updateProgress(0);

progressText.textContent =
  "Waiting for production to start...";
