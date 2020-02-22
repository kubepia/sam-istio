kubectl run -i -t tool --image=darumms/msg-cli:latest --restart=Never



curl http://head.sam-istio:8080/call/backend.sam/3000/v1


k logs -f backend-v1-79c8fcd54d-p7zm4 -c backend --tail=10
k logs -f backend-v2-5bb5477bd8-zvmfj -c backend --tail=10
