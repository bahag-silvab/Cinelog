#!/bin/bash

set -e

PROJECT_ID="sandbox-project-443508"
REGION="europe-west1"
REPOSITORY="cinelog-ravi"
IMAGE_NAME="cinelog-frontend-gcp"
SERVICE_NAME="cinelog-frontend-ravi"

IMAGE_URL="$REGION-docker.pkg.dev/$PROJECT_ID/$REPOSITORY/$IMAGE_NAME:latest"

# Load env vars from .env.deployment
export $(grep -v '^#' .env.deployment | xargs)

echo "🔨 Building image..."
docker build --no-cache --platform linux/amd64 \
  --build-arg NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
  -t $IMAGE_NAME .

echo "🏷️  Tagging image..."
docker tag $IMAGE_NAME $IMAGE_URL

echo "📤 Pushing image..."
docker push $IMAGE_URL

echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_URL \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080

echo "✅ Done!"