let devices = {
  livingRoom: [
    { id: 'lr-light1', name: 'Main Lights', status: 'online', isActive: true, icon: 'lightbulb' },
    { id: 'lr-thermo', name: 'Thermostat', status: 'online', isActive: true, value: '72°F', icon: 'thermometer' },
    { id: 'lr-speaker', name: 'Smart Speaker', status: 'online', isActive: false, icon: 'speaker' },
    { id: 'lr-camera', name: 'Security Camera', status: 'online', isActive: true, icon: 'camera' },
  ],
  bedroom: [
    { id: 'br-light1', name: 'Bedroom Lights', status: 'online', isActive: false, icon: 'lightbulb' },
    { id: 'br-thermo', name: 'AC Unit', status: 'online', isActive: true, value: '68°F', icon: 'thermometer' },
    { id: 'br-lock', name: 'Smart Lock', status: 'online', isActive: true, icon: 'lock' },
  ],
  kitchen: [
    { id: 'k-light1', name: 'Under Cabinet', status: 'online', isActive: true, icon: 'lightbulb' },
    { id: 'k-light2', name: 'Island Pendant', status: 'offline', isActive: false, icon: 'lightbulb' },
    { id: 'k-camera', name: 'Kitchen Camera', status: 'online', isActive: false, icon: 'camera' },
  ],
  office: [
    { id: 'o-light1', name: 'Desk Lamp', status: 'online', isActive: true, icon: 'lightbulb' },
    { id: 'o-speaker', name: 'Work Speaker', status: 'online', isActive: false, icon: 'speaker' },
  ]
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Render devices
  renderDevices();
  
  // Update stats
  updateStats();
});

// Toast functionality
function showToast(title, description) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-title">${title}</div>
    <div class="toast-description">${description}</div>
  `;
  
  container.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 3000);
}

// Navigation handlers
function handleDashboard() {
  document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
  showToast('Dashboard', 'Viewing your smart home dashboard');
}

function handleDevices() {
  document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
  showToast('Device Management', 'Control all your smart home devices');
}

function handleAutomation() {
  showToast('Automation Hub', 'Set up intelligent automation rules for your home');
}

function handleAnalytics() {
  showToast('Analytics & Insights', 'View detailed analytics and energy usage reports');
}

function handleSecurity() {
  showToast('Security Center', 'Monitor your home security system');
}

function handleSettings() {
  showToast('Settings', 'Configure your smart home preferences');
}

function handleGetStarted() {
  showToast('Welcome to Smart Home Automation! 🏠', 'Your journey to a smarter home begins now. Check your devices below.');
  document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
}

function handleViewDemo() {
  showToast('Demo Mode Activated! 🎬', 'Try toggling devices to see the smart home system in action.');
  document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
}

// Device management
function renderDevices() {
  Object.keys(devices).forEach(roomKey => {
    const containerId = roomKey.replace(/([A-Z])/g, '-$1').toLowerCase() + '-devices';
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    devices[roomKey].forEach(device => {
      const deviceCard = createDeviceCard(device);
      container.appendChild(deviceCard);
    });
  });
  
  // Reinitialize icons after rendering
  lucide.createIcons();
}

function createDeviceCard(device) {
  const card = document.createElement('div');
  card.className = `device-card ${device.isActive ? 'active' : ''} ${device.status === 'offline' ? 'offline' : ''}`;
  card.onclick = () => toggleDevice(device.id);
  
  card.innerHTML = `
    <div class="device-header">
      <div class="device-icon">
        <i data-lucide="${device.icon}"></i>
      </div>
      <span class="device-status ${device.status}">${device.status}</span>
    </div>
    <div class="device-name">${device.name}</div>
    ${device.value ? `<div class="device-value">${device.value}</div>` : ''}
  `;
  
  return card;
}

function toggleDevice(deviceId) {
  // Find and toggle the device
  for (const room in devices) {
    const deviceIndex = devices[room].findIndex(d => d.id === deviceId);
    if (deviceIndex !== -1) {
      if (devices[room][deviceIndex].status === 'offline') {
        showToast('Device Offline', 'Cannot control offline devices');
        return;
      }
      
      devices[room][deviceIndex].isActive = !devices[room][deviceIndex].isActive;
      const status = devices[room][deviceIndex].isActive ? 'activated' : 'deactivated';
      showToast('Device Updated', `${devices[room][deviceIndex].name} has been ${status}`);
      break;
    }
  }
  
  // Re-render devices and update stats
  renderDevices();
  updateStats();
}

function updateStats() {
  const allDevices = Object.values(devices).flat();
  const totalDevices = allDevices.length;
  const activeDevices = allDevices.filter(d => d.isActive).length;
  const onlineDevices = allDevices.filter(d => d.status === 'online').length;
  
  // Update total devices
  const totalElement = document.getElementById('total-devices');
  if (totalElement) {
    totalElement.textContent = totalDevices.toString();
  }
  
  // Update active devices
  const activeElement = document.getElementById('active-devices');
  const percentageElement = document.getElementById('active-percentage');
  if (activeElement) {
    activeElement.textContent = activeDevices.toString();
  }
  if (percentageElement) {
    percentageElement.textContent = `${Math.round((activeDevices/totalDevices)*100)}%`;
  }
  
  // Update online devices
  const onlineElement = document.getElementById('online-devices');
  if (onlineElement) {
    onlineElement.textContent = `${onlineDevices}/${totalDevices}`;
  }
}

// Smooth scrolling for all internal links
document.addEventListener('click', function(e) {
  if (e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Add some sample automation to make it feel alive
setInterval(() => {
  // Randomly toggle a device every 30 seconds for demo purposes
  if (Math.random() > 0.8) {
    const allDevices = Object.values(devices).flat().filter(d => d.status === 'online');
    if (allDevices.length > 0) {
      const randomDevice = allDevices[Math.floor(Math.random() * allDevices.length)];
      // Don't show toast for automatic changes
      for (const room in devices) {
        const deviceIndex = devices[room].findIndex(d => d.id === randomDevice.id);
        if (deviceIndex !== -1) {
          devices[room][deviceIndex].isActive = !devices[room][deviceIndex].isActive;
          break;
        }
      }
      renderDevices();
      updateStats();
    }
  }
}, 30000);