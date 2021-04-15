# Multicluster federation with Istio



Multicluster is the ability to view more then one cluster in the same way

![image-20210329141528054](./imgs/image-20210329141528054.png)

Witht the multicluster I am able to deploy the application on more then one porvider/region/availability zone

![image-20210329141826239](./imgs/image-20210329141826239.png)

Actually there is a project called KubeFed in order to handle cluster federation

![image-20210329142012935](./imgs/image-20210329142012935.png)

Using service mesh, a layer that allow the application to communicate each other in a standard way, could be useful to solve this kind of problem (I mean the multi cluster federation)

![image-20210329142206586](./imgs/image-20210329142206586.png)

Service mesh can solve a lot of problem, like service discovery, load balancing, circuit breaker, secure communication, observability, a/b testing, canary deploy, ....

![image-20210329142403520](./imgs/image-20210329142403520.png)

![image-20210329142454309](./imgs/image-20210329142454309.png)

![image-20210329142515603](./imgs/image-20210329142515603.png)



How to deploy Istio service mesh:

![image-20210329142724311](./imgs/image-20210329142724311.png)



## Single cluster installation

![image-20210329142845745](./imgs/image-20210329142845745.png)



## Multi cluster

![image-20210329142947445](./imgs/image-20210329142947445.png)

How can I solve the DNS when I have multi cluster?

![image-20210329143123376](./imgs/image-20210329143123376.png)

we can leverage to dns proxy of istio, so we can avoid to deploy the service in  each cluster.

## Single network model

![image-20210329143314445](./imgs/image-20210329143314445.png)

## Multi network model

![image-20210329143414457](./imgs/image-20210329143414457.png)

in this case we have to use the istio gateway. 

## Istio control plane model

### single control plane in one cluster

![image-20210329143531841](./imgs/image-20210329143531841.png)

### single control plane in multi cluster

![image-20210329143625604](./imgs/image-20210329143625604.png)

### external control plane 

![image-20210329143706280](./imgs/image-20210329143706280.png)

### More control plane on more cluster

![image-20210329143823428](./imgs/image-20210329143823428.png)

### Summary

![image-20210329143947119](./imgs/image-20210329143947119.png)

How can we discover endpoint in different control planes?

![image-20210329144057652](./imgs/image-20210329144057652.png)

# Demo

![image-20210329144217683](./imgs/image-20210329144217683.png)

