document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const millisecondsElement = document.getElementById('milliseconds');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapTimesContainer = document.getElementById('lapTimes');
    
    // Stopwatch variables
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 0;
    
    // Format time to always show 2 digits
    function formatTime(time) {
        return time.toString().padStart(2, '0');
    }
    
    // Format milliseconds to always show 2 digits
    function formatMilliseconds(time) {
        return time.toString().padStart(2, '0').slice(0, 2);
    }
    
    // Update the stopwatch display
    function updateDisplay() {
        const totalMilliseconds = elapsedTime + (isRunning ? Date.now() - startTime : 0);
        
        const hours = Math.floor(totalMilliseconds / 3600000);
        const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);
        
        hoursElement.textContent = formatTime(hours);
        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);
        millisecondsElement.textContent = formatMilliseconds(milliseconds);
    }
    
    // Start the stopwatch
    function startStopwatch() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateDisplay, 10);
            isRunning = true;
            
            startPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            resetBtn.disabled = false;
            lapBtn.disabled = false;
        } else {
            clearInterval(timerInterval);
            elapsedTime = Date.now() - startTime;
            isRunning = false;
            
            startPauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
        }
    }
    
    // Reset the stopwatch
    function resetStopwatch() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        lapCount = 0;
        
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        millisecondsElement.textContent = '00';
        
        startPauseBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        resetBtn.disabled = true;
        lapBtn.disabled = true;
        
        // Clear lap times
        lapTimesContainer.innerHTML = '';
    }
    
    // Record a lap time
    function recordLap() {
        if (!isRunning) return;
        
        lapCount++;
        const currentTime = elapsedTime + (Date.now() - startTime);
        
        const hours = Math.floor(currentTime / 3600000);
        const minutes = Math.floor((currentTime % 3600000) / 60000);
        const seconds = Math.floor((currentTime % 60000) / 1000);
        const milliseconds = Math.floor((currentTime % 1000) / 10);
        
        const formattedTime = 
            `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`;
        
        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${formattedTime}</span>
        `;
        
        // Add new lap at the top
        if (lapTimesContainer.firstChild) {
            lapTimesContainer.insertBefore(lapItem, lapTimesContainer.firstChild);
        } else {
            lapTimesContainer.appendChild(lapItem);
        }
    }
    
    // Event listeners
    startPauseBtn.addEventListener('click', startStopwatch);
    resetBtn.addEventListener('click', resetStopwatch);
    lapBtn.addEventListener('click', recordLap);
    
    // Initialize
    updateDisplay();
});