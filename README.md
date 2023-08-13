# 🌐 OpenVPN3 GUI

Simplify your OpenVPN3 experience with a user-friendly GUI. Built on Electron for Linux.

## Screenshot
![image](https://github.com/msharifi99/openvpn3-gui/assets/33135409/4017787d-7444-4c2e-8278-d354a77242f6)


Show off your application with a screenshot here.

✨ Features
Easy Configuration Management: Quickly view, modify, and manage your VPN configurations.
Session Management: Start, restart and disconnect your session easly.
Connection Status: Stay updated with real-time connection statuses.

## 🛠️ Installation
Prerequisites: Ensure you have Node.js installed and openvpn3 CLI set up on your machine.

Clone the repository:

```bash
git clone https://github.com/your-username/openvpn3-gui.git
```

Navigate to the project directory:

```bash
cd openvpn3-gui
```

Install the dependencies:

```bash
npm install
```

Start the app:

```bash
tsc --watch
electron .
```

## 💼 Packaging for Ubuntu
To package the app for Ubuntu, run:

```bash
npm run build
```

This will generate a .deb package in the dist directory, which can be installed on Ubuntu.

## 🚀 Usage
Once installed, launch the application. From the main interface:

Load Configuration: Load your OpenVPN configuration file.
Connect: Establish a VPN connection with a single click.
Manage Profiles: Easily switch between different VPN profiles.

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

We also appreciate feedback and suggestions!

📖 License
This project is licensed under the MIT License - see the LICENSE file for details.

