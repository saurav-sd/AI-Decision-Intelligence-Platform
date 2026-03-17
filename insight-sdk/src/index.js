class InsightSDK {
  constructor() {
    this.apiKey = null;
    this.baseUrl = "http://127.0.0.1:8000"; // your FastAPI
    this.queue = []; // 🆕 event queue
    this.batchSize = 5; // send after 5 events
    this.flushInterval = 5000; // or every 5 sec
  }

  trackPageView() {
    this.track("page_view", {
      url: window.location.href,
    });
  }

  autoTrackClicks() {
    document.addEventListener("click", (e) => {
      const target = e.target;

      this.track("click", {
        tag: target.tagName,
        text: target.innerText,
      });
    });
  }

  init(apiKey) {
    this.trackPageView();
    this.autoTrackClicks();
      this.apiKey = apiKey;

  // flush every X seconds
  setInterval(() => {
    this.flush();
  }, this.flushInterval);
    console.log("Insight initialized with API Key:", apiKey);
    }
    
    async flush() {
  if (this.queue.length === 0) return;

  const eventsToSend = [...this.queue];
  this.queue = [];

  try {
    await fetch(`${this.baseUrl}/events/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventsToSend),
    });

    console.log("Batch sent:", eventsToSend);
  } catch (error) {
    console.error("Batch failed, retrying...", error);

    // push back to queue for retry
    this.queue.unshift(...eventsToSend);
  }
}

  async track(eventName, properties = {}) {
    if (!this.apiKey) {
      console.error("Insight not initialized");
      return;
    }

    const payload = {
      user_id: this.getUserId(),
      event_name: eventName,
        properties: properties,
      retries: 0, // 🆕 retry count
      };
      
      this.queue.push(payload);

      // send if batch full
  if (this.queue.length >= this.batchSize) {
    this.flush();
  }

    try {
      await fetch(`${this.baseUrl}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Event tracked:", payload);
    } catch (error) {
      console.error("Tracking failed:", error);
    }
  }

  getUserId() {
    let userId = localStorage.getItem("insight_user_id");

    if (!userId) {
      userId = "user_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("insight_user_id", userId);
    }

    return userId;
  }
}

const Insight = new InsightSDK();

export default Insight;
