import * as pulumi from "@pulumi/pulumi";
import * as containerservice from "@pulumi/azure-native/containerservice";
import * as resources from "@pulumi/azure-native/resources";

const spApplicationId = "04748fc0-b1dd-4af9-a455-0f8904003da8";
const spPassword = "IZy1pYIUotmsMuY7.lomkaJ874cu00isg2";

// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("BMF");

const managedClusterName = "bmf-aks";
const cluster = new containerservice.ManagedCluster(managedClusterName, {
    resourceGroupName: resourceGroup.name,
    addonProfiles: {
        KubeDashboard: {
            enabled: true,
        },
    },
    agentPoolProfiles: [{
        count: 1,
        maxPods: 110,
        mode: "System",
        name: "default",
        nodeLabels: {},
        osDiskSizeGB: 30,
        osType: "Linux",
        type: "VirtualMachineScaleSets",
        vmSize: "Standard_DS2_v2",
    }],
    dnsPrefix: managedClusterName,
    enableRBAC: true,
    kubernetesVersion: "1.18.14",
    nodeResourceGroup: `MC_azure-go_${managedClusterName}`,
    servicePrincipalProfile: {
        clientId: spApplicationId,
        secret: spPassword,
    },
});

const creds = pulumi.all([cluster.name, resourceGroup.name]).apply(([clusterName, rgName]) => {
    return containerservice.listManagedClusterUserCredentials({
        resourceGroupName: rgName,
        resourceName: clusterName,
    });
});

const encoded = creds.kubeconfigs[0].value;
export const kubeconfig = encoded.apply(enc => Buffer.from(enc, "base64").toString());