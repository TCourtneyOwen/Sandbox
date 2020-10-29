# Create VMs from Custom VM
$machineNameBase = 'opx-azure-0'

for($i=1; $i -le 2; $i++) {
   $machineName = $machineNameBase + $i.ToString();
   Write-Host 'Creating VM:'$machineName
    az lab vm create --resource-group OPX-VHDs --lab-name OPX-Dev-Test-Lab --name $machineName --image "WinDFImage" --image-type custom --size 'Standard_B2ms' --admin-username 'OPXAdmin' --admin-password 'HelloWorld1!' --ip-configuration 'public'
}