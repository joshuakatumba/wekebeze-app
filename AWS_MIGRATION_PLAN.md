# Wekebeze Cancer Awareness: AWS Migration & Architecture Plan

This document outlines the strategy for migrating the Wekebeze MERN (MongoDB, Express, React, Node.js) application to Amazon Web Services (AWS). It details the specific target architecture, the exact reasons for choosing these services, a deep dive into authentication, and a step-by-step migration plan.

---

## 1. Target AWS Architecture

Based on the current MERN stack, we will adopt a **Serverless/Managed Container** architecture. This provides maximum scalability, high availability, and reduces the operational overhead of managing raw virtual machines.

### The Stack map:
* **Frontend (React)** -> **Amazon S3 + Amazon CloudFront**
* **Backend API (Node.js)** -> **Amazon ECS (Elastic Container Service) with AWS Fargate**
* **Database (MongoDB)** -> **Amazon DocumentDB** (or MongoDB Atlas hosted on AWS VPC)
* **Authentication** -> **Amazon Cognito**
* **DNS & Routing** -> **Amazon Route 53 + AWS Certificate Manager (ACM)**

### Why this Architecture?

1. **Amazon S3 + CloudFront (Frontend):** 
   - *Why:* Hosting a built React Single Page Application (SPA) on raw servers (EC2) is a waste of compute resources. S3 acts as a highly durable static file store, while CloudFront (CDN) caches your UI globally. 
   - *Benefit:* Users in Uganda, Europe, or the US will load the React app in milliseconds from the CDN edge node closest to them, completely protected from DDoS attacks.

2. **Amazon ECS with Fargate (Backend):**
   - *Why:* Instead of managing EC2 Linux servers, you package your Node.js code into a Docker container. Fargate is a "serverless compute engine" for containers.
   - *Benefit:* If the app suddenly goes viral due to a cancer awareness campaign, Fargate will automatically spin up 10, 50, or 100 containers to handle the traffic, and scale back down to 1 when traffic drops. You only pay for exact compute time used.

3. **Amazon DocumentDB (Database):**
   - *Why:* DocumentDB is AWS's fully managed, MongoDB-compatible database.
   - *Benefit:* It natively integrates with AWS VPCs (Virtual Private Clouds) meaning your database is never exposed to the public internet. It also handles automatic backups, patching, and multi-zone replication so you don't lose cancer chat node data if a server fails.

---

## 2. Authentication Deep Dive: Amazon Cognito

Currently, the application likely relies on a custom JWT mechanism and `AuthContext`. 

**The Plan:** Migrate identity management completely out of the Node.js backend and into **Amazon Cognito User Pools**.

### Why Cognito?
- **Security:** You no longer need to write logic for salting/hashing passwords or managing password recovery flows. Cognito complies with HIPAA and other strict health-data standards.
- **Social Login:** Cognito allows you to add "Sign in with Google/Apple" with just a few clicks.
- **MFA (Multi-Factor Auth):** Instantly enable SMS or authenticator app 2FA for your Admin users to secure the Admin Dashboard.
- **Stateless Verification:** The Node.js API will simply verify the cryptographic signature of the JWT token provided by Cognito, meaning the API doesn't need to hit the database to verify a user on every request.

### Implementation:
1. The React `AuthContext` will be updated to use the `aws-amplify` auth library.
2. The user submits login info to Cognito natively from the React app.
3. Cognito returns a JWT.
4. React attaches this JWT as a Bearer token to API calls.
5. The Node.js Express backend uses `aws-jwt-verify` middleware to grant access to protected routes like `/api/admin/chat-nodes`.

---

## 3. Step-by-step Migration Plan

Migrating to the cloud will happen in tightly controlled phases to ensure zero downtime.

#### Phase 1: Containerization & Pre-requisites
- **Step 1:** Write a `Dockerfile` for the Node.js backend.
- **Step 2:** Test the Docker container locally to ensure it can successfully connect to the existing database and run the API.
- **Step 3:** Register the Wekebeze domain on **Route 53** and request a free TLS/SSL certificate via **AWS ACM**.

#### Phase 2: Database & Authentication Setup
- **Step 1:** Provision an **Amazon DocumentDB** cluster inside a private AWS VPC subnet.
- **Step 2:** Use **AWS Database Migration Service (DMS)** to replicate the current MongoDB data into DocumentDB.
- **Step 3:** Setup the **Amazon Cognito User Pool**.
- **Step 4:** Write a one-time script to iterate through the existing users in MongoDB, and carefully migrate their emails over to Cognito (passwords cannot be migrated due to hashing; users will be required to do a "Forgot Password" or force reset on first cloud login).

#### Phase 3: Infrastructure Deployment (Dev Environment)
- **Step 1:** Upload the Node Docker image to **Amazon ECR** (Elastic Container Registry).
- **Step 2:** Define the **ECS Fargate** Task Definition (CPU/Memory requirements, env vars like `MONGO_URI`).
- **Step 3:** Set up an **Application Load Balancer (ALB)** to route traffic (`api.wekebeze.com`) only to healthy Fargate containers.

#### Phase 4: Frontend Deployment & Cutover
- **Step 1:** Update the React Frontend `.env` file to point to the new `api.wekebeze.com` and the new Cognito Pool IDs.
- **Step 2:** Run `npm run build` and sync the `dist` folder to the **S3 Bucket**.
- **Step 3:** Point **CloudFront** to the S3 Bucket.
- **Step 4 (The Cutover):** Update the root domain (`wekebeze.com`) in Route53 to alias the CloudFront distribution. 
- **Step 5:** Perform validation testing on the live environment. Decommission old servers.
