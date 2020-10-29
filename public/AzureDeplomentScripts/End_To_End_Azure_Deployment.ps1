# Convert sysprepped vhdx to vhd format
$localVhdxPath = '\\cowen-mail\VHDs\WinDF-01\Virtual Hard Disks\WinDF-02.vhdx'
$localVhdPath = '\\cowen-mail\VHDs\WinDF-01\Virtual Hard Disks\WinDF-02.vhd'
# Convert-VHD $localVhdxPath $localVhdPath

# Upload VHD to Blob Store
# Provide values for the variables
$resourceGroup = 'OPX-VHDs'
$storageaccount = 'aopxdevtestlab6464'
$containername = 'uploads'
$vhdName = 'WinDF.vhd'


# Upload the VHD
$urlOfUploadedImageVhd = ('https://' + $storageaccount + '.blob.core.windows.net/' + $containername + '/' + $vhdName)
Add-AzVhd -ResourceGroupName $resourceGroup -Destination $urlOfUploadedImageVhd -LocalFilePath $localVhdPath

# Create Custom Image from VHD
# Log in to your Azure account.  
#Connect-AzAccount

# Select the desired Azure subscription. 
$subscriptionId = 'fb31a92f-824a-4de5-bf31-722222f81009'
Select-AzSubscription -SubscriptionId $subscriptionId

# Get the lab object.
$labRg = 'OPX-VHDs'
$labName = 'OPX-Dev-Test-Lab'
$lab = Get-AzResource -ResourceId ('/subscriptions/' + $subscriptionId + '/resourceGroups/' + $labRg + '/providers/Microsoft.DevTestLab/labs/' + $labName)

# Get the lab storage account and lab storage account key values.
$labStorageAccount = Get-AzResource -ResourceId $lab.Properties.defaultStorageAccount 
$labStorageAccountKey = (Get-AzStorageAccountKey -ResourceGroupName $labStorageAccount.ResourceGroupName -Name $labStorageAccount.Name)

# Set the URI of the VHD file.	
$vhdUri = 'https://aopxdevtestlab6464.blob.core.windows.net/uploads/WinDF.vhd'

# Set the custom image name and description values.
$customImageName = 'WinDFImage'
$customImageDescription = 'Image created from uploaded vhd'

# Set up the parameters object.
$parameters = @{existingLabName="$($lab.Name)"; existingVhdUri=$vhdUri; imageOsType='windows'; isVhdSysPrepped=$false; imageName=$customImageName; imageDescription=$customImageDescription}

# Create the custom image. 
New-AzResourceGroupDeployment -ResourceGroupName $lab.ResourceGroupName -Name CreateCustomImage -TemplateUri 'https://raw.githubusercontent.com/Azure/azure-devtestlab/master/samples/DevTestLabs/QuickStartTemplates/201-dtl-create-customimage-from-vhd/azuredeploy.json' -TemplateParameterObject $parameters

# Create VMs from Cusom Image
$machineNameBase = 'opx-azure-0'
for($i=1; $i -le 4; $i++) {
   $machineName = $machineNameBase + $i.ToString();
   Write-Host 'Creating VM:'$machineName
   az lab vm create --resource-group OPX-VHDs --lab-name OPX-Dev-Test-Lab --name $machineName --image $customImageName  --image-type custom --size 'Standard_B2ms' --admin-username 'OPXAdmin' --admin-password 'HelloWorld1!'
   Write-Host 'Apply artifacts to '$machineName
   az lab vm apply-artifacts --lab-name  OPX-Dev-Test-Lab --name $machineName --resource-group opx-vhds  --artifacts '@\\officefile\public\cowen\AzureDeplomentScripts\artifacts.json'
}
