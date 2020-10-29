# Delete VMs
$machineNameBase = 'opx-azure-0'

for($i=1; $i -le 5; $i++) {
   $machineName = $machineNameBase + $i.ToString();
   Write-Host 'Stopping and deleting VM:'$machineName
   az lab vm stop --lab-name OPX-Dev-Test-Lab --name $machineName --resource-group OPX-VHDs
   az lab vm delete --lab-name OPX-Dev-Test-Lab --name $machineName --resource-group OPX-VHDs
}