locals {
    resource_group_name = "BMF"
    location            = "West Europe"
    cluster_name        = "BMF-AKS"
    dns_prefix          = "bmf-k8s"
}

terraform {  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.52.0"
    }
  }
}

# Configure the Microsoft Azure Provider using as authentication
# creating a service principal using the command
# > az ad sp create-for-rbac --skip-assignment
# and copying the values into the terraform.tfvars file  
provider "azurerm" {
  features {}
}

# create ResourceGroup where to put the AKS cluster
resource "azurerm_resource_group" "rg" {
  name     = local.resource_group_name
  location = local.location
}

# create the kubernetes cluster AKS
resource "azurerm_kubernetes_cluster" "default" {
  name                  = local.cluster_name
  location              = azurerm_resource_group.rg.location
  resource_group_name   = azurerm_resource_group.rg.name
  dns_prefix            = "bmf-k8s"

  default_node_pool {
    name                    = "default"
    node_count              = 1
    vm_size                 = "Standard_D2_v2"
    os_disk_size_gb         = 30
    orchestrator_version    = "1.20.2"
    enable_auto_scaling     = false
  }

  role_based_access_control {
    enabled = true
  }

  addon_profile {
    kube_dashboard {
      enabled = true
    }
  }

  service_principal {
    client_id     = var.appId
    client_secret = var.password
  }
}

# istio installation


