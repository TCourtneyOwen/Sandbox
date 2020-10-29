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