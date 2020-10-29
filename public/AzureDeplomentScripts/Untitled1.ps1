$labName = 'OPX-Dev-Test-Lab';
$machineNameBase = 'opx-azure-0';
$resourceGroup = 'OPX-VHDs';;
$adminPwd = (Get-AzureKeyVaultSecret -VaultName OPXServiceAccounts -Name 'opxadmin').SecretValueText.ToString();

# Remove agent from agent pool and delete machine
for($i=1; $i -le 1; $i++) {
   $machineName = $machineNameBase + $i.ToString(); 
   Write-Host 'Removing agent from agent pool: '$machineName;
   az lab vm apply-artifacts --lab-name  $labName --name $machineName --resource-group $resourceGroup  --artifacts '@\\officefile\public\cowen\AzureDeplomentScripts\removeAgent.json';
   Write-Host 'Deleting VM:'$machineName;
   az lab vm delete --lab-name $labName --name $machineName --resource-group $resourceGroup
}

# Create VMs in lab and apply artifacts
for($i=1; $i -le 4; $i++) {
   $machineName = $machineNameBase + $i.ToString();
   Write-Host 'Creating VM:'$machineName
   az lab vm create --resource-group $resourceGroup --lab-name $labName --name $machineName --image 'Windows 10 Enterprise for Virtual Desktops Preview, Version 1809 + Office 365 ProPlus' --image-type gallery --size 'Standard_B4ms' --admin-username 'OPXAdmin' --saved-secret 'opxadmin'
   Write-Host 'Apply artifacts to '$machineName
   az lab vm apply-artifacts --lab-name  $labName --name $machineName --resource-group $resourceGroup  --artifacts '@\\officefile\public\cowen\AzureDeplomentScripts\artifacts.json'
}