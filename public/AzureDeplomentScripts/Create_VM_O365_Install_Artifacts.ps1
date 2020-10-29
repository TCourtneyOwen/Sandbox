# Create VMs from pro-canned image with O365 installed
# Create VMs from Custom VM
$machineNameBase = 'opx-azure-0'

for($i=1; $i -le 4; $i++) {
   $machineName = $machineNameBase + $i.ToString();
   Write-Host 'Creating VM:'$machineName
   az lab vm create --resource-group OPX-VHDs --lab-name OPX-Dev-Test-Lab --name $machineName --image "Windows 10 Enterprise for Virtual Desktops Preview, Version 1809 + Office 365 ProPlus"  --image-type gallery --size 'Standard_B2ms' --admin-username 'OPXAdmin' --admin-password 'HelloWorld1!'
   Write-Host 'Apply artifacts to '$machineName
   az lab vm apply-artifacts --lab-name  OPX-Dev-Test-Lab --name $machineName --resource-group opx-vhds  --artifacts '@c:\artifacts\artifacts.json'
}
