# Wall of Advice

A digital community board where people can anonymously share and discover wisdom through colorful sticky notes on an infinite canvas.

## Overview

Wall of Advice is an interactive web application that creates a space for meaningful human connection in the digital age. Users can leave anonymous pieces of advice, wisdom, or encouraging messages by placing virtual sticky notes anywhere on an infinite canvas.

### Key Features

- 🎯 Click-to-add messages anywhere on the wall
- 🎨 Colorful, draggable sticky notes
- 🔍 Zoomable and pannable infinite canvas
- ✍️ Optional message signing with #username
- 💫 Smooth animations and intuitive interface
- 📱 Responsive design for all devices

## Technology Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Redis (Upstash)
- Vercel/Netlify for deployment

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables
Create a .env.local file and add:
```bash
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```
4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. Click anywhere on the wall to add a message
2. Write your message - it can be advice, thoughts, or kind words
3. Optionally sign your message with #yourname at the end
4. Press Enter or click "Add Message" to save
5. Drag to pan around the wall
6. Use zoom controls to zoom in/out

## Deployment

### Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Deploy on Netlify
You can also deploy using [Netlify](https://www.netlify.com/) with zero configuration.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch
```bash
git checkout -b feature/featurename
```
3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ for sharing wisdom
