## Overview

This app demonstrates using server-side-events (SSE) from a Next.js app deployed
to Firebase Hosting. The SSE support is achieved by deploying the event streaming
API to Cloud Run.

To try the app, open the following links in a browser:

https://nextjs-sensor-demo-3lam4rtc4a-uc.a.run.app/sensor
https://nextjs-sensor-demo-3lam4rtc4a-uc.a.run.app

Move the slider of the range control on the sensor and observe the updates in
the other page.

## Prerequisites

1. Google Cloud account
2. Google Cloud project: `firebase-cloudrun-sse-demo`
3. `gcloud` CLI
4. `firebase` CLI

## Getting Started

### 1. Clone the repo

```text
git clone https://github.com/subfuzion/firebase-cloudrun-sse-demo
```

Or

```text
git clone git@github.com:subfuzion/firebase-cloudrun-sse-demo
```

### 2. `cd` into the repo directory

```text
cd firebase-cloudrun-sse-demo
```

Note that there are two main app subdirectories:

```text
$ ls
README.md       cloudrun        firebase
```

### 3. Deploy the `event-streaming` service to Cloud Run

#### 3.1 `cd` to the repo `cloudrun` directory

```text
cd firebase-cloudrun-sse-demo/cloudrun
```

#### 3.2 Sign in to Google Cloud

```text
gcloud auth login
```

#### 3.3 Enable Google Cloud APIs

```text
npm run enable-cloud-services
```

#### 3.4 Deploy the service

```text
npm run deploy
```

### 3. Deploy the Next.js app to Firebase Hosting

#### 3.1 `cd` to the repo `firebase` directory

If you're in the `cloudrun` directory after following the previous steps in
section 2, enter:

```text
cd ../firebase
```

#### 3.2 Sign in to Firebase

```text
firebase login
```

#### 3.3 Enable web frameworks preview for Next.js

```text
firebase experiments:enable webframeworks
```

#### 3.4 Initialize the Firebase project

```text
firebase init hosting
```

Choose the same region used for the `cloudrun` deployment (`us-central1`).

#### 3.5 Open the `firebase.json` in your editor

#### 3.6 Add the following `rewrite` configuration under the `hosting` section

```text
"hosting": {
  // ...

  // Add the "rewrites" attribute within "hosting"
  "rewrites": [{
    "source": "/data",
    "run": {
      "serviceId": "event-service",
      "region": "us-central1",
      "pinTag": true
    }
  }]
}
```

#### 3.5 Deploy Next.js app to Firebase Hosting

```text
firebase deploy --only hosting
```
