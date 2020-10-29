$labName = 'OPX-Dev-Test-Lab';
$machineNameBase = 'opx-azure-0';
$resourceGroup = 'OPX-VHDs';
$subscription = 'fb31a92f-824a-4de5-bf31-722222f81009'


# Remove agent from agent pool and delete machine
for($i=1; $i -le 5; $i++) {
   $machineName = $machineNameBase + $i.ToString();
   Write-Host 'Starting VM:'$machineName
   az lab vm start --lab-name  $labName --name $machineName --resource-group $resourceGroup
   Write-Host 'Removing agent from '$machineName
   az lab vm apply-artifacts --lab-name  $labName --name $machineName --resource-group $resourceGroup  --artifacts '@\\officefile\public\cowen\AzureDeplomentScripts\removeAgent.json' --subscription $subscription
   Write-Host 'Deleting VM:'$machineName;
   az lab vm delete --lab-name $labName --name $machineName --resource-group $resourceGroup --subscription $subscription
}

# Create Windows 1809 VMs in lab and apply artifacts
for($i=1; $i -le 2; $i++) {
   $machineName = $machineNameBase + $i.ToString();
   Write-Host 'Creating VM:'$machineName
   az lab vm create --resource-group $resourceGroup --lab-name $labName --name $machineName --image 'Windows 10 Enterprise multi-session, Version 1809 + Microsoft 365 Apps' --image-type gallery --size 'Standard_B4ms' --admin-username 'OPXAdmin' --saved-secret 'opxadmin' --subscription $subscription
   Write-Host 'Starting VM '$machineName
   az lab vm start --lab-name  $labName --name $machineName --resource-group $resourceGroup
   Write-Host 'Apply artifacts to '$machineName
   az lab vm apply-artifacts --lab-name  $labName --name $machineName --resource-group $resourceGroup  --artifacts '@\\officefile\public\cowen\AzureDeplomentScripts\artifacts1809.json' --subscription $subscription
}

# Create Windows 1903 VMs in lab and apply artifacts
for($i=3; $i -le 5; $i++) {
   $machineName = $machineNameBase + $i.ToString();
   Write-Host 'Creating VM:'$machineName
   az lab vm create --resource-group $resourceGroup --lab-name $labName --name $machineName --image 'Windows 10 Enterprise multi-session, Version 2004 + Microsoft 365 Apps' --image-type gallery --size 'Standard_B4ms' --admin-username 'OPXAdmin' --saved-secret 'opxadmin' --subscription $subscription
   Write-Host 'Starting VM:'$machineName
   az lab vm start --lab-name  $labName --name $machineName --resource-group $resourceGroup
   Write-Host 'Apply artifacts to '$machineName
   az lab vm apply-artifacts --lab-name  $labName --name $machineName --resource-group $resourceGroup  --artifacts '@\\officefile\public\cowen\AzureDeplomentScripts\artifacts1903.json' --subscription $subscription
}

