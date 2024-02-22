// Define a function to load tasks from localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");

  savedTasks.forEach((taskText) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" onchange="removeTask(this)">
      <span>${taskText}</span>
    `;
    taskList.appendChild(li);
  });
}

// Define a function to save tasks to localStorage
function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = Array.from(taskList.children).map(
    (li) => li.querySelector("span").textContent
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Define the function to add a task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" onchange="removeTask(this)">
      <span>${taskInput.value}</span>
    `;
    taskList.insertBefore(li, taskList.firstChild); // Insert new task at the top
    taskInput.value = "";

    // Save tasks to localStorage
    saveTasks();
  }
}

// Define the function to remove a task
function removeTask(checkbox) {
  const li = checkbox.parentElement;
  const taskList = document.getElementById("taskList");

  if (checkbox.checked) {
    taskList.removeChild(li);

    // Save tasks to localStorage after removing
    saveTasks();
  }
}

// Define the function to update date and time
function updateDateTime() {
  const dateElement = document.getElementById("date");
  const timeElement = document.getElementById("time");

  const currentDate = new Date();

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = currentDate.toLocaleDateString("en-US", dateOptions);
  const formattedTime = currentDate.toLocaleTimeString("en-US", timeOptions);

  dateElement.textContent = formattedDate;
  timeElement.textContent = formattedTime;
}

// Update date and time initially
updateDateTime();

// Update date and time every minute
setInterval(updateDateTime, 60000);

// Load tasks when the page loads
loadTasks();

// Add event listener to the task input for the 'Enter' key
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

//  fetching and displaying images from Unsplash
let clientID = "A05exA58W1xewTI2NDJ30h2ycZuQMig748kkLPfw";
let endpoint = `https://api.nasa.gov/planetary/apod?api_key=A05exA58W1xewTI2NDJ30h2ycZuQMig748kkLPfw`;

let imageElement = document.querySelector("#unsplashImage");
let imageLink = document.querySelector("#ImageLink");

fetch(endpoint)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    console.log(jsonData);
    if (jsonData.media_type === "image") {
      imageElement.src = jsonData.url;
      imageLink.href = jsonData.hdurl; // Link to the high-definition image
      imageLink.textContent = "View HD Image"; // Text for the link
    } else {
      console.error("Today's astronomy picture is not an image.");
    }
  })
  .catch(function (error) {
    console.error("Error fetching data from NASA API:", error);
  });

function updateWeather() {
  const weatherInfo = document.getElementById("weather-info");
  const apiKey = "288d83813c1674286701634fbfab4b6c";
  const city = "Cape Town";

  const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(weatherEndpoint)
    .then((response) => response.json())
    .then((weatherData) => {
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const weatherText = ` ${temperature}°C`;
      const descriptionText = ` ${description}`;

      weatherInfo.innerHTML = `${weatherText}<br>${descriptionText}`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherInfo.textContent = "Unable to fetch weather data.";
    });
}

// Call the updateWeather function to display weather information
updateWeather();

// Optionally, you can update the weather information every 10 minutes (600000 milliseconds)
setInterval(updateWeather, 600000);
