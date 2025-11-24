# Kubernetes Fullstack Demo (Frontend + Backend + Ingress)

This project demonstrates a simple full-stack deployment on **Kubernetes using Minikube**.  
It includes:

- **Backend** – Node.js API (`/api/hello`)
- **Frontend** – Static HTML/JS site served by Nginx
- **Ingress** – Routes traffic to frontend & backend

The goal is to learn how to containerize, deploy, expose, and route traffic between services in a real Kubernetes workflow.

---

## Project Structure

backend/
frontend/
k8s/ # Kubernetes manifests

yaml
Copy code

---

## Getting Started

### 1. Start Minikube

```sh
minikube start
minikube addons enable ingress
🛠 Build Docker Images inside Minikube
Tell Docker to use Minikube’s internal Docker daemon:

sh
Copy code
eval $(minikube -p minikube docker-env)
Build backend:
sh
Copy code
docker build -t test-backend:latest ./backend/
Build frontend:
sh
Copy code
docker build -t test-frontend:latest ./frontend/
Deploy to Kubernetes
Apply all manifests inside the k8s/ folder:

sh
Copy code
kubectl apply -f k8s/
Verify:

sh
Copy code
kubectl get pods
kubectl get svc
kubectl get ingress
Expose the Ingress Controller (Minikube-only)
Minikube does not expose the ingress controller automatically, so expose it manually:

sh
Copy code
kubectl -n ingress-nginx expose deployment ingress-nginx-controller \
  --type=NodePort \
  --name=ingress-nginx-controller
Get the external URL:

sh
Copy code
minikube service ingress-nginx-controller -n ingress-nginx --url
Example output:

cpp
Copy code
http://192.168.49.2:31467
Test the Application
Frontend:
php-template
Copy code
http://<MINIKUBE-IP>:<NODEPORT>/
Backend API:
perl
Copy code
http://<MINIKUBE-IP>:<NODEPORT>/api/hello
Example:

sh
Copy code
curl http://192.168.49.2:31467/api/hello
Updating the Backend
You only need to rebuild and restart the deployment when backend code changes:

sh
Copy code
eval $(minikube -p minikube docker-env)
docker build -t test-backend:latest ./backend/
kubectl rollout restart deployment demo-backend
Useful Commands
Description	Command
List everything	kubectl get all -A
Check logs	kubectl logs -f <pod>
Restart a deployment	kubectl rollout restart deploy <name>
Get ingress	kubectl get ingress

✔ What I learnt from Project Teaches
How to run Kubernetes locally with Minikube

Building Docker images inside Minikube

Deployments, Services, and Ingress

Path-based routing (/ → frontend, /api → backend)

Rolling updates via kubectl rollout restarts

Notes
This setup is for local development only (Minikube).

For production, you would use a LoadBalancer or cloud-managed ingress.