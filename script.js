class SpinToSpeak {
    constructor() {
        this.participants = [];
        this.selectedParticipants = new Set();
        this.history = [];
        this.isSpinning = false;
        this.canvas = document.getElementById('rouletteCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = Math.min(this.centerX, this.centerY) - 10;
        
        this.colors = [
            '#64ffda', '#00bcd4', '#ff6b9d', '#ff8e53', 
            '#9c27b0', '#3f51b5', '#2196f3', '#4caf50',
            '#ff9800', '#f44336', '#e91e63', '#673ab7'
        ];
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // CSV file upload
        document.getElementById('csvFile').addEventListener('change', (e) => {
            this.handleFileUpload(e);
        });

        // Spin button
        document.getElementById('spinBtn').addEventListener('click', () => {
            this.spin();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.reset();
        });
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            this.parseCSV(csv);
        };
        reader.readAsText(file);
    }

    parseCSV(csv) {
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        // Find the name column (case insensitive)
        const nameIndex = headers.findIndex(h => h.toLowerCase() === 'name');
        if (nameIndex === -1) {
            alert('CSV file must have a "name" column in the first row.');
            return;
        }

        this.participants = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const values = line.split(',').map(v => v.trim());
                const name = values[nameIndex];
                if (name) {
                    this.participants.push(name);
                }
            }
        }

        if (this.participants.length === 0) {
            alert('No valid names found in the CSV file.');
            return;
        }

        // Show roulette section and draw wheel
        document.getElementById('rouletteSection').style.display = 'block';
        this.selectedParticipants.clear();
        this.history = [];
        this.updateHistory();
        this.drawWheel();
        this.updateSpinButton();
    }

    drawWheel() {
        if (this.participants.length === 0) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const availableParticipants = this.participants.filter(p => !this.selectedParticipants.has(p));
        if (availableParticipants.length === 0) {
            this.drawEmptyWheel();
            return;
        }

        const sliceAngle = (2 * Math.PI) / availableParticipants.length;

        availableParticipants.forEach((participant, index) => {
            const startAngle = index * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            // Draw slice
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = this.colors[index % this.colors.length];
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Draw text
            this.ctx.save();
            this.ctx.translate(this.centerX, this.centerY);
            this.ctx.rotate(startAngle + sliceAngle / 2);
            this.ctx.textAlign = 'right';
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
            this.ctx.shadowBlur = 2;
            
            // Truncate long names
            let displayName = participant;
            if (displayName.length > 12) {
                displayName = displayName.substring(0, 10) + '...';
            }
            
            this.ctx.fillText(displayName, this.radius - 20, 5);
            this.ctx.restore();
        });

        // Draw center circle
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 20, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.strokeStyle = '#667eea';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }

    drawEmptyWheel() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw empty wheel
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#f7fafc';
        this.ctx.fill();
        this.ctx.strokeStyle = '#cbd5e0';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();

        // Draw text
        this.ctx.fillStyle = '#a0aec0';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('All participants selected!', this.centerX, this.centerY - 10);
        this.ctx.font = '14px Arial';
        this.ctx.fillText('Click Reset to start over', this.centerX, this.centerY + 15);
    }

    spin() {
        if (this.isSpinning || this.participants.length === 0) return;

        const availableParticipants = this.participants.filter(p => !this.selectedParticipants.has(p));
        if (availableParticipants.length === 0) return;

        this.isSpinning = true;
        document.getElementById('spinBtn').disabled = true;

        // Random selection
        const randomIndex = Math.floor(Math.random() * availableParticipants.length);
        const winner = availableParticipants[randomIndex];

        // Calculate final rotation angle
        const sliceAngle = (2 * Math.PI) / availableParticipants.length;
        const targetAngle = randomIndex * sliceAngle + sliceAngle / 2;
        const rotations = 5 + Math.random() * 5; // 5-10 full rotations
        const finalRotation = rotations * 2 * Math.PI - targetAngle;

        // Animate spinning
        let currentRotation = 0;
        const duration = 3000; // 3 seconds
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            currentRotation = finalRotation * easeOut;

            this.canvas.style.transform = `rotate(${currentRotation}rad)`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.onSpinComplete(winner);
            }
        };

        animate();
    }

    onSpinComplete(winner) {
        this.isSpinning = false;
        document.getElementById('spinBtn').disabled = false;

        // Add to selected participants
        this.selectedParticipants.add(winner);

        // Add to history
        const timestamp = new Date();
        this.history.unshift({
            name: winner,
            time: timestamp
        });

        // Update display
        this.updateWinnerDisplay(winner);
        this.updateHistory();
        this.drawWheel();
        this.updateSpinButton();

        // Highlight winner
        const winnerDisplay = document.getElementById('winnerDisplay');
        winnerDisplay.classList.add('winner-highlight');
        setTimeout(() => {
            winnerDisplay.classList.remove('winner-highlight');
        }, 2000);
    }

    updateWinnerDisplay(winner) {
        const winnerText = document.querySelector('.winner-text');
        winnerText.textContent = winner;
        winnerText.style.color = '#ff6b9d';
        winnerText.style.fontSize = '0.8rem';
        winnerText.style.textShadow = '0 0 10px rgba(255, 107, 157, 0.5)';
    }

    updateHistory() {
        const historyList = document.getElementById('historyList');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="no-history">No selections yet</p>';
            return;
        }

        historyList.innerHTML = this.history.map(item => {
            const timeString = item.time.toLocaleTimeString();
            return `
                <div class="history-item">
                    <span class="name">${item.name}</span>
                    <span class="time">${timeString}</span>
                </div>
            `;
        }).join('');
    }

    updateSpinButton() {
        const availableParticipants = this.participants.filter(p => !this.selectedParticipants.has(p));
        const spinBtn = document.getElementById('spinBtn');
        
        if (availableParticipants.length === 0) {
            spinBtn.disabled = true;
            spinBtn.textContent = '🎯 All Selected!';
        } else {
            spinBtn.disabled = false;
            spinBtn.textContent = `🎲 SPIN (${availableParticipants.length} left)`;
        }
    }

    reset() {
        this.selectedParticipants.clear();
        this.history = [];
        this.updateHistory();
        this.drawWheel();
        this.updateSpinButton();
        
        // Reset winner display
        const winnerText = document.querySelector('.winner-text');
        winnerText.textContent = 'Click Spin!';
        winnerText.style.color = '#4a5568';
        winnerText.style.fontSize = '0.8rem';
        winnerText.style.textShadow = 'none';
        
        // Reset canvas rotation
        this.canvas.style.transform = 'rotate(0deg)';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpinToSpeak();
}); 