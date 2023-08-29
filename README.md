# Line Bot Webhook Endpoint 

This project provides a webhook endpoint for receiving and processing event notifications from a [LINE Messaging API](https://developers.line.biz/en/services/messaging-api/). The endpoint receives messages from a LINE bot, processes the messages and replies accordingly. It features the use of a key-value database - [Vercel kv](https://github.com/vercel/kv) (a simple Redis-like interface using the Vercel SDK) to store incoming messages.

## Features

1. **Receiving Events**: Upon successfully setting up of webhook URL and enabling the usage of webhooks on the LINE Developers console, the endpoint will start receiving webhook events from a LINE bot.

2. **Event Processing**: Each webhook event represents a single user action in LINE app. The endpoint is able to handle text message event types and replies to them.

3. **Storing Messages**: Incoming messages, including message ID, user ID, and message timestamp, are stored in Vercel kv.

4. **Replying to Messages**: The endpoint is capable of replying to the message events. The reply is made through LINE Messaging API's reply message functionality.

## Pages

1. **Message View Page**: This page displays messages saved in the database by user ID. You can view all messages exchanged for each LINE user.

2. **Event Log Page**: This page shows a log of all incoming webhook events. It's useful for debugging and understanding the behavior of your LINE bot.

## Configuration

To configure the LINE Bot, set these environment variables in your .env file:

```dotenv
CHANNEL_SECRET=your_channel_secret
CHANNEL_ACCESS_TOKEN=your_channel_access_token
```

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the server using `npm run dev`.
4. Set your webhook URL on LINE Developers console to point to your local or production server.

## Setup

In addition to the above, you will need to set up Vercel KV storage:

1. **Link Your Project**: Run `vercel link` in your CLI to connect to your existing project. If you don’t already have a project to connect to, you can start with a KV template.

2. **Pull Environment Variables**: Run `vercel env pull .env.development.local` to sync the environment variables to your local project.

3. **Install the SDK**: Run `npm install @vercel/kv` to add the Vercel KV SDK to your project. This package provides utilities for working with Vercel's key-value storage .

## Usage

Send the text message to your LINE bot. The bot will reply with "You said: {message_content}".

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.